import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user.repository';
import { BloodType } from 'src/types/enums';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async changeUserName(id: number, name: string): Promise<void> {
    return this.userRepository.updateUserName(id, name);
  }

  async changeBloodType(id: number, bloodType: BloodType): Promise<void> {
    return this.userRepository.updateBloodType(id, bloodType);
  }
}
