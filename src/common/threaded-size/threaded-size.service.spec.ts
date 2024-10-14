import { Test, TestingModule } from '@nestjs/testing';
import { ThreadedSizeService } from './threaded-size.service';

describe('ThreadedSizeService', () => {
  let service: ThreadedSizeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThreadedSizeService],
    }).compile();

    service = module.get<ThreadedSizeService>(ThreadedSizeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
