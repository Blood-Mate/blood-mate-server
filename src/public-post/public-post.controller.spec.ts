import { Test, TestingModule } from '@nestjs/testing';
import { PublicPostController } from './public-post.controller';

describe('PublicPostController', () => {
  let controller: PublicPostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicPostController],
    }).compile();

    controller = module.get<PublicPostController>(PublicPostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
