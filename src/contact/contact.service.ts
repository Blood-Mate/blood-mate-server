import { Injectable, NotFoundException } from '@nestjs/common';
import { Contact } from 'src/entities/contact.entity';
import { User } from 'src/entities/user.entity';
import { ContactRepository } from 'src/repositories/contact.repository';
import { UserRepository } from 'src/repositories/user.repository';
import { AddContactDto } from './dto/add-contact.dto';
import { ChangeSendingTargetDto } from './dto/change-sending-target.dto';
import { ContactDto } from './dto/contact.dto';

@Injectable()
export class ContactService {
  constructor(
    private readonly contactRepository: ContactRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async addContacts(user: User, contactsDto: AddContactDto[]): Promise<void> {
    contactsDto.forEach(async (contact: AddContactDto) => {
      const { name, phoneNumber } = contact;

      const contactExist =
        await this.contactRepository.findContactByPhoneNumber(
          user.id,
          phoneNumber,
        );

      if (contactExist) return;

      await this.contactRepository.createContact(user, name, phoneNumber);
    });

    return;
  }

  async getContacts(userId: number): Promise<ContactDto[]> {
    const contacts = await this.contactRepository.getContacts(userId);

    const contactWithIsUser = await Promise.all(
      contacts.map(async (contact: Contact) => {
        const user = await this.userRepository.findUserByPhoneNumber(
          contact.phoneNumber,
        );

        return { ...contact, isUser: user ? true : false } as ContactDto;
      }),
    );

    return contactWithIsUser;
  }

  async deleteContact(userId: number, contactId: number): Promise<void> {
    const result = await this.contactRepository.deleteContactById(
      userId,
      contactId,
    );
    console.log('result', result);

    if (result.affected === 0) {
      throw new NotFoundException(`contactId ${contactId} does not exist`);
    }
  }

  async changeSendingTarget(
    userId: number,
    changeSendingTargetDto: ChangeSendingTargetDto,
  ): Promise<void> {
    const { contactId, isSendingTarget } = changeSendingTargetDto;

    await this.contactRepository.updateSendingTarget(
      userId,
      contactId,
      isSendingTarget,
    );
    return;
  }
}
