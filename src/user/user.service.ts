import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user.repository';
import { GetUserInfoDto } from './dto/get-user-info.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserInfo(id: number): Promise<GetUserInfoDto> {
    const user = await this.userRepository.getUserWithPosts(id);

    return GetUserInfoDto.of(user);
  }

  async updateUser(id: number, updateDto: UpdateUserDto): Promise<void> {
    return this.userRepository.updateUser(id, updateDto);
  }
}
