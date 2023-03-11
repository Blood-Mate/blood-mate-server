import { Test, TestingModule } from '@nestjs/testing';
import { PrivatePostController } from './private-post.controller';
import { PrivatePostService } from './private-post.service';

describe('PrivatePostController', () => {
  let controller: PrivatePostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrivatePostController],
      providers: [PrivatePostService],
    }).compile();

    controller = module.get<PrivatePostController>(PrivatePostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
