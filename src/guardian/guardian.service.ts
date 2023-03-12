import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { GuardianRepository } from 'src/repositories/guardian.repository';
import { UserRepository } from 'src/repositories/user.repository';
import { GetGuardianRequestorDto } from './dto/get-guardian-requestor.dto';
import { GetGuardianDto } from './dto/get-guardian.dto';

@Injectable()
export class GuardianService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly guardianRepository: GuardianRepository,
  ) {}
  async addGuardian(user: User, counterpartId: number): Promise<void> {
    const guardianConnect =
      await this.guardianRepository.findByRequestorAndGuardian(
        user.id,
        counterpartId,
      );

    if (guardianConnect) {
      throw new BadRequestException('The counterpart is already your guardian');
    }

    const counterpart = await this.userRepository.findUserById(counterpartId);

    return this.guardianRepository.createGuardian(user, counterpart);
  }

  async getGuardians(userId: number): Promise<GetGuardianDto[]> {
    const guardians = await this.guardianRepository.findByRequestorId(userId);

    return guardians.map((guardian) => GetGuardianDto.of(guardian));
  }

  async getGuardianRequestors(
    userId: number,
  ): Promise<GetGuardianRequestorDto[]> {
    const requestors = await this.guardianRepository.findByGuardianId(userId);

    return requestors.map((requestor) => GetGuardianRequestorDto.of(requestor));
  }

  async deleteGuardian(userId: number, guardianId: number): Promise<void> {
    const result = await this.guardianRepository.deleteGuardian(
      userId,
      guardianId,
    );

    if (result.affected === 0) {
      throw new NotFoundException(`guardianId ${guardianId} does not exist`);
    }
  }
}
