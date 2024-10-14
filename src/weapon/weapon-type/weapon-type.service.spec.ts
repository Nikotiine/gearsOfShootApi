import { Test, TestingModule } from '@nestjs/testing';
import { WeaponTypeService } from './weapon-type.service';

describe('WeaponTypeService', () => {
  let service: WeaponTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeaponTypeService],
    }).compile();

    service = module.get<WeaponTypeService>(WeaponTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
