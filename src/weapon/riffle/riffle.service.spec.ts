import { Test, TestingModule } from '@nestjs/testing';
import { RiffleService } from './riffle.service';

describe('RiffleService', () => {
  let service: RiffleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RiffleService],
    }).compile();

    service = module.get<RiffleService>(RiffleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
