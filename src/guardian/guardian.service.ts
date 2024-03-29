import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { ContactRepository } from 'src/repositories/contact.repository';
import { GuardianConnectRepository } from 'src/repositories/guardian-connect.repository';
import { UserRepository } from 'src/repositories/user.repository';
import { GetGuardianRequestorDto } from './dto/get-guardian-requestor.dto';
import { GetGuardianDto } from './dto/get-guardian.dto';

@Injectable()
export class GuardianService {
  constructor(
    private readonly contactRepository: ContactRepository,
    private readonly userRepository: UserRepository,
    private readonly guardianConnectRepository: GuardianConnectRepository,
  ) {}
  async addGuardian(user: User, targetPhoneNumber: string): Promise<void> {
    const guardians = await this.guardianConnectRepository.findByRequestorId(
      user.id,
    );

    if (guardians.length >= 4) {
      throw new BadRequestException(
        'The number of guardians cannot exceed four',
      );
    }

    const target = await this.userRepository.findUserByPhoneNumber(
      targetPhoneNumber,
    );

    if (!target) {
      throw new NotFoundException('The counterpart is not found');
    }

    const guardianConnect =
      await this.guardianConnectRepository.findByRequestorAndGuardian(
        user.id,
        target.id,
      );

    if (guardianConnect) {
      throw new BadRequestException('The counterpart is already your guardian');
    }

    const counterpart = await this.userRepository.findUserById(target.id);

    return this.guardianConnectRepository.createGuardian(user, counterpart);
  }

  async getGuardians(userId: number): Promise<GetGuardianDto[]> {
    const guardianConnections =
      await this.guardianConnectRepository.findByRequestorId(userId);

    const guardians = Promise.all(
      guardianConnections.map(async (guardianConnection) => {
        const guardian = GetGuardianDto.of(guardianConnection);
        guardian.name = (
          await this.contactRepository.findContactByPhoneNumber(
            userId,
            guardianConnection.guardian.phoneNumber,
          )
        ).name;
        return guardian;
      }),
    );

    return guardians;
  }

  async getGuardianRequestors(
    userId: number,
  ): Promise<GetGuardianRequestorDto[]> {
    const requestors = await this.guardianConnectRepository.findByGuardianId(
      userId,
    );

    return requestors.map((requestor) => GetGuardianRequestorDto.of(requestor));
  }

  async deleteGuardian(userId: number, guardianId: number): Promise<void> {
    const result = await this.guardianConnectRepository.deleteGuardian(
      userId,
      guardianId,
    );

    if (result.affected === 0) {
      throw new NotFoundException(`guardianId ${guardianId} does not exist`);
    }
  }
}
