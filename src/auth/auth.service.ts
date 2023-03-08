import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcryptjs';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<void> {
    const { phoneNumber, password, name, bloodType } = registerUserDto;

    const user = await this.userRepository.findUserByPhoneNumber(phoneNumber);

    if (user) {
      throw new BadRequestException(
        'The requested userId is already registered',
      );
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    return this.userRepository.createUser(
      phoneNumber,
      hashedPassword,
      name,
      bloodType,
    );
  }

  async login(loginUserDto: LoginUserDto): Promise<any> {
    const { phoneNumber, password } = loginUserDto;

    const user = await this.userRepository.findUserByPhoneNumber(phoneNumber);

    if (!user)
      throw new NotFoundException(
        'The requested phoneNumber is not registered',
      );

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

  async checkPhoneNumberExist(phoneNumber: string): Promise<boolean> {
    const user = await this.userRepository.findUserByPhoneNumber(phoneNumber);

    if (user) return true;
    else return false;
  }

  async generateRefreshToken(id: number): Promise<string> {
    const refreshToken = await this.jwtService.signAsync(
      { id },
      {
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRE,
      },
    );

    return await this.userRepository.updateRefreshToken(id, refreshToken);
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
