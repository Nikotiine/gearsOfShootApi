import { Test, TestingModule } from '@nestjs/testing';
import { AmmunitionService } from './ammunition.service';

describe('AmmunitionService', () => {
  let service: AmmunitionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AmmunitionService],
    }).compile();

    service = module.get<AmmunitionService>(AmmunitionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
