import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user.repository';
import { BloodType } from 'src/types/enums';
import { GetUserInfoDto } from './dto/get-user-info';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserInfo(id: number): Promise<GetUserInfoDto> {
    const user = await this.userRepository.getUserWithPosts(id);

    return GetUserInfoDto.of(user);
  }

  async changeUserName(id: number, name: string): Promise<void> {
    return this.userRepository.updateUserName(id, name);
  }

  async changeBloodType(id: number, bloodType: BloodType): Promise<void> {
    return this.userRepository.updateBloodType(id, bloodType);
  }
}
