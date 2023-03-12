import { Test, TestingModule } from '@nestjs/testing';
import { PublicPostService } from './public-post.service';

describe('PublicPostService', () => {
  let service: PublicPostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PublicPostService],
    }).compile();

    service = module.get<PublicPostService>(PublicPostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
