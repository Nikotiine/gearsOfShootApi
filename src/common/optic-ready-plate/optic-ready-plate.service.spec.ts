import { Test, TestingModule } from '@nestjs/testing';
import { OpticReadyPlateService } from './optic-ready-plate.service';

describe('OpticReadyPlateService', () => {
  let service: OpticReadyPlateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpticReadyPlateService],
    }).compile();

    service = module.get<OpticReadyPlateService>(OpticReadyPlateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
