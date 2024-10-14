import { Test, TestingModule } from '@nestjs/testing';
import { AmmunitionBodyTypeService } from './ammunition-body-type.service';

describe('AmmunitionBodyTypeService', () => {
  let service: AmmunitionBodyTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AmmunitionBodyTypeService],
    }).compile();

    service = module.get<AmmunitionBodyTypeService>(AmmunitionBodyTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
