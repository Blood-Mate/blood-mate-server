import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { ContactRepository } from 'src/repositories/contact.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from 'src/entities/contact.entity';
import { UserRepository } from 'src/repositories/user.repository';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contact, User])],
  providers: [ContactService, ContactRepository, UserRepository],
  controllers: [ContactController],
})
export class ContactModule {}
