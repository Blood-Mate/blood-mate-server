import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { BloodType } from 'src/types/enums';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async createUser(
    phoneNumber: string,
    password: string,
    name: string,
    bloodType: BloodType,
  ): Promise<void> {
    const user = this.repository.create({
      phoneNumber,
      password,
      name,
      bloodType,
    });

    try {
      await this.repository.save(user);
    } catch (e) {
      throw e;
    }
  }

  async findUserById(id: number): Promise<User> {
    return this.repository.findOne({ where: { id } });
  }

  async findUserByPhoneNumber(phoneNumber: string): Promise<User> {
    return this.repository.findOne({ where: { phoneNumber } });
  }

  async updateUserName(id: number, name: string): Promise<void> {
    const user = await this.findUserById(id);

    user.name = name;

    try {
      await this.repository.save(user);
    } catch (e) {
      throw e;
    }
  }

  async updateBloodType(id: number, bloodType: BloodType): Promise<void> {
    const user = await this.findUserById(id);

    user.bloodType = bloodType;

    try {
      await this.repository.save(user);
    } catch (e) {
      throw e;
    }
  }

  async updateRefreshToken(id: number, refreshToken: string): Promise<string> {
    const user = await this.findUserById(id);
    user.refreshToken = refreshToken;

    try {
      await this.repository.save(user);

      return refreshToken;
    } catch (e) {
      throw e;
    }
  }
}
