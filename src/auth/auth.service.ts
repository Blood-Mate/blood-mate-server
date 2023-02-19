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
    const { email, password, role } = authCredentialsDto;

    const user = await this.userRepository.findOne({ where: { email } });

    if (user) {
      throw new BadRequestException(
        'The requested email is already registered',
      );
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = this.userRepository.create({
      email,
      password: hashedPassword,
      role,
    });

    try {
      return await this.userRepository.save(newUser);
    } catch (e) {
      throw e;
    }
  }

  async login(authCredentialsDto: AuthCredentialsDto): Promise<any> {
    const { email, password, role } = authCredentialsDto;
    console.log('authCredentials', authCredentialsDto);

    const user = await this.userRepository.findOne({ where: { email, role } });

    if (!user) throw new NotFoundException('Email does not exist');

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

  async generateRefreshToken(userId: number): Promise<string> {
    const refreshToken = await this.jwtService.signAsync(
      { userId },
      {
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRE,
      },
    );

    const user = await this.userRepository.findOne({ where: { id: userId } });
    user.refreshToken = refreshToken;

    await this.userRepository.save(user);

    return refreshToken;
  }

  async generateAccessToken(userId: number): Promise<string> {
    return await this.jwtService.signAsync(
      { userId },
      {
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRE,
      },
    );
  }
}
