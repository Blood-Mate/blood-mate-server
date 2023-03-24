import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from 'src/entities/contact.entity';
import { GuardianConnect } from 'src/entities/guardian-connect.entity';
import { User } from 'src/entities/user.entity';
import { ContactRepository } from 'src/repositories/contact.repository';
import { GuardianConnectRepository } from 'src/repositories/guardian-connect.repository';
import { UserRepository } from 'src/repositories/user.repository';
import { GuardianController } from './guardian.controller';
import { GuardianService } from './guardian.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, GuardianConnect, Contact])],
  controllers: [GuardianController],
  providers: [
    GuardianService,
    UserRepository,
    GuardianConnectRepository,
    ContactRepository,
  ],
})
export class GuardianModule {}
