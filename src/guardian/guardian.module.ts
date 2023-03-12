import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuardianConnect } from 'src/entities/guardian-connect.entity';
import { User } from 'src/entities/user.entity';
import { GuardianConnectRepository } from 'src/repositories/guardian-connect.repository';
import { UserRepository } from 'src/repositories/user.repository';
import { GuardianController } from './guardian.controller';
import { GuardianService } from './guardian.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, GuardianConnect])],
  controllers: [GuardianController],
  providers: [GuardianService, UserRepository, GuardianConnectRepository],
})
export class GuardianModule {}
