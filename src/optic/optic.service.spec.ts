import { Test, TestingModule } from '@nestjs/testing';
import { OpticService } from './optic.service';

describe('OpticService', () => {
  let service: OpticService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpticService],
    }).compile();

    service = module.get<OpticService>(OpticService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
