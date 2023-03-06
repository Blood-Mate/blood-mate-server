import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { userId, password } = authCredentialsDto;

    const user = await this.userRepository.findOne({ where: { userId } });

    if (user) {
      throw new BadRequestException(
        'The requested userId is already registered',
      );
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = this.userRepository.create({
      userId,
      password: hashedPassword,
    });

    try {
      return await this.userRepository.save(newUser);
    } catch (e) {
      throw e;
    }
  }

  async login(authCredentialsDto: AuthCredentialsDto): Promise<any> {
    const { userId, password } = authCredentialsDto;

    const user = await this.userRepository.findOne({ where: { userId } });

    if (!user)
      throw new NotFoundException('The requested userId does not exist');

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const refreshToken =
        user.refreshToken || (await this.generateRefreshToken(user.id));

      const accessToken = await this.generateAccessToken(user.id);

      return { refreshToken, accessToken };
    } else {
      throw new BadRequestException('Password mismatch');
    }
  }

  async googleLogin(googleAuth: any): Promise<any> {
    const { provider, userId, email } = googleAuth;

    const user = await this.userRepository.findOne({
      where: { userId, provider },
    });

    if (!user) {
      //회원가입
      const newUser = this.userRepository.create({
        userId,
        email,
        password: 'google',
        provider,
      });

      try {
        await this.userRepository.save(newUser);
      } catch (e) {
        throw e;
      }

      const refreshToken = await this.generateRefreshToken(newUser.id);
      const accessToken = await this.generateAccessToken(newUser.id);

      return { refreshToken, accessToken };
    } else {
      const refreshToken =
        user.refreshToken || (await this.generateRefreshToken(user.id));
      const accessToken = await this.generateAccessToken(user.id);

      return { refreshToken, accessToken };
    }
  }

  async generateRefreshToken(id: number): Promise<string> {
    const refreshToken = await this.jwtService.signAsync(
      { id },
      {
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRE,
      },
    );

    const user = await this.userRepository.findOne({ where: { id } });
    user.refreshToken = refreshToken;

    await this.userRepository.save(user);

    return refreshToken;
  }

  async generateAccessToken(id: number): Promise<string> {
    return await this.jwtService.signAsync(
      { id },
      {
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRE,
      },
    );
  }
}
