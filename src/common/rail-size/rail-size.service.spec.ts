import { Test, TestingModule } from '@nestjs/testing';
import { RailSizeService } from './rail-size.service';

describe('RailSizeService', () => {
  let service: RailSizeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RailSizeService],
    }).compile();

    service = module.get<RailSizeService>(RailSizeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
