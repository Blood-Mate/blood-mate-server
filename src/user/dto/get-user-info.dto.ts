import { ApiProperty } from '@nestjs/swagger';
import { PrivatePost } from 'src/entities/private-post.entity';
import { PublicPost } from 'src/entities/public-post.entity';
import { User } from 'src/entities/user.entity';
import { BloodType } from 'src/types/enums';

export class GetUserInfoDto {
  @ApiProperty({ description: 'id' })
  id!: number;

  @ApiProperty({ description: '전화번호' })
  phoneNumber!: string;

  @ApiProperty({ description: '이름' })
  name!: string;

  @ApiProperty({ description: '혈액형' })
  bloodType: BloodType;

  @ApiProperty({ description: '작성한 지역 지정헌혈 포스트' })
  publicPosts: PublicPost[];

  @ApiProperty({ description: '작성한 지인 지정헌혈 포스트' })
  privatePosts: PrivatePost[];

  static of(user: User): GetUserInfoDto {
    return {
      id: user.id,
      phoneNumber: user.phoneNumber,
      name: user.name,
      bloodType: user.bloodType,
      publicPosts: user.publicPosts,
      privatePosts: user.privatePosts,
    };
  }
}
