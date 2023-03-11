import { Test, TestingModule } from '@nestjs/testing';
import { PrivatePostService } from './private-post.service';

describe('PrivatePostService', () => {
  let service: PrivatePostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrivatePostService],
    }).compile();

    service = module.get<PrivatePostService>(PrivatePostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
