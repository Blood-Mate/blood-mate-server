import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { BloodType } from 'src/types/enums';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
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

  async getUserWithPosts(id: number): Promise<User> {
    return this.repository.findOne({
      where: { id },
      relations: {
        publicPosts: true,
        privatePosts: true,
      },
    });
  }

  async updateUser(id: number, updateDto: UpdateUserDto): Promise<void> {
    const user = await this.findUserById(id);

    try {
      await this.repository.save({ ...user, ...updateDto });
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
