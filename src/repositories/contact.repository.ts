import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from 'src/entities/contact.entity';
import { User } from 'src/entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class ContactRepository extends Repository<Contact> {
  constructor(
    @InjectRepository(Contact) private readonly repository: Repository<Contact>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async createContact(
    user: User,
    name: string,
    phoneNumber: string,
  ): Promise<void> {
    const contact = this.repository.create({
      user,
      name,
      phoneNumber,
    });

    try {
      await this.repository.save(contact);
    } catch (e) {
      throw e;
    }
    return;
  }

  async getContacts(userId: number): Promise<Contact[]> {
    return this.repository.find({ where: { user: { id: userId } } });
  }

  async getOneByPhoneNumber(userId: number, phoneNumber: string) {
    return this.repository.findOne({
      where: {
        user: { id: userId },
        phoneNumber: phoneNumber,
      },
    });
  }

  async findContactByPhoneNumber(
    userId: number,
    phoneNumber: string,
  ): Promise<Contact> {
    return this.repository.findOne({
      where: { user: { id: userId }, phoneNumber },
    });
  }

  async deleteContactById(
    userId: number,
    contactId: number,
  ): Promise<DeleteResult> {
    return this.repository.delete({ id: contactId, user: { id: userId } });
  }

  async updateSendingTarget(
    userId: number,
    contactId: number,
    isSendingTarget: boolean,
  ): Promise<void> {
    const contact = await this.repository.findOne({
      where: { id: contactId, user: { id: userId } },
    });

    contact.isSendingTarget = isSendingTarget;

    try {
      await this.repository.save(contact);
    } catch (e) {
      throw e;
    }
  }

  async getSendingTargetContacts(userId: number): Promise<Contact[]> {
    return this.repository.find({
      where: {
        user: { id: userId },
        isSendingTarget: true,
      },
    });
  }
}
