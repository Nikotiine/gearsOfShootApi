import { Test, TestingModule } from '@nestjs/testing';
import { AmmunitionHeadTypeService } from './ammunition-head-type.service';

describe('AmmunitionHeadTypeService', () => {
  let service: AmmunitionHeadTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AmmunitionHeadTypeService],
    }).compile();

    service = module.get<AmmunitionHeadTypeService>(AmmunitionHeadTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
