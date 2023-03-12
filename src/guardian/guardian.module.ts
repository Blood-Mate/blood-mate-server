import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guardian } from 'src/entities/guardian.entity';
import { User } from 'src/entities/user.entity';
import { GuardianRepository } from 'src/repositories/guardian.repository';
import { UserRepository } from 'src/repositories/user.repository';
import { GuardianController } from './guardian.controller';
import { GuardianService } from './guardian.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Guardian])],
  controllers: [GuardianController],
  providers: [GuardianService, UserRepository, GuardianRepository],
})
export class GuardianModule {}
