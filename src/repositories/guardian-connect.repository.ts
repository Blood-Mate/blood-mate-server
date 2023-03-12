import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GuardianConnect } from 'src/entities/guardian-connect.entity';
import { User } from 'src/entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class GuardianConnectRepository extends Repository<GuardianConnect> {
  constructor(
    @InjectRepository(GuardianConnect)
    private readonly repository: Repository<GuardianConnect>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async createGuardian(requestor: User, guardian: User): Promise<void> {
    const guardianConnect = this.repository.create({
      requestor,
      guardian,
    });

    try {
      await this.repository.save(guardianConnect);
    } catch (e) {
      throw e;
    }
  }

  async findByRequestorId(requestorId: number): Promise<GuardianConnect[]> {
    return this.repository.find({
      relations: { guardian: true },
      where: { requestor: { id: requestorId } },
    });
  }

  async findByGuardianId(guardianId: number): Promise<GuardianConnect[]> {
    return this.repository.find({
      relations: { requestor: true },
      where: { guardian: { id: guardianId } },
    });
  }

  async findByRequestorAndGuardian(
    requestorId: number,
    guardianId,
  ): Promise<GuardianConnect> {
    return this.repository.findOne({
      where: {
        requestor: { id: requestorId },
        guardian: { id: guardianId },
      },
    });
  }

  async deleteGuardian(requestorId: number, guardianId): Promise<DeleteResult> {
    return this.repository.delete({
      requestor: { id: requestorId },
      guardian: { id: guardianId },
    });
  }
}
