import { Test, TestingModule } from '@nestjs/testing';
import { OpticUnitService } from './optic-unit.service';

describe('OpticUnitService', () => {
  let service: OpticUnitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpticUnitService],
    }).compile();

    service = module.get<OpticUnitService>(OpticUnitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
