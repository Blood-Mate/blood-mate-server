import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { GuardianConnectRepository } from 'src/repositories/guardian-connect.repository';
import { UserRepository } from 'src/repositories/user.repository';
import { GetGuardianRequestorDto } from './dto/get-guardian-requestor.dto';
import { GetGuardianDto } from './dto/get-guardian.dto';

@Injectable()
export class GuardianService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly guardianConnectRepository: GuardianConnectRepository,
  ) {}
  async addGuardian(user: User, counterpartId: number): Promise<void> {
    const guardianConnect =
      await this.guardianConnectRepository.findByRequestorAndGuardian(
        user.id,
        counterpartId,
      );

    if (guardianConnect) {
      throw new BadRequestException('The counterpart is already your guardian');
    }

    const counterpart = await this.userRepository.findUserById(counterpartId);

    return this.guardianConnectRepository.createGuardian(user, counterpart);
  }

  async getGuardians(userId: number): Promise<GetGuardianDto[]> {
    const guardians = await this.guardianConnectRepository.findByRequestorId(
      userId,
    );

    return guardians.map((guardian) => GetGuardianDto.of(guardian));
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
