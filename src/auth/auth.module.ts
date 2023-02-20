import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { User } from 'src/entities/user.entity';
import { GoogleStrategy } from './guard/google.strategy';
import { GoogleGuardianStrategy } from './guard/google.guardian.strategy';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: async () => {
        return {
          secret: process.env.JWT_SECRET_KEY,
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, GoogleGuardianStrategy],
})
export class AuthModule {}
