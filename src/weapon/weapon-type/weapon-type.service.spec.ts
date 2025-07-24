import { Test, TestingModule } from '@nestjs/testing';
import { WeaponTypeService } from './weapon-type.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { WeaponType } from '../../database/entity/weapon-type.entity';

describe('WeaponTypeService', () => {
  let service: WeaponTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WeaponTypeService,
        {
          provide: getRepositoryToken(WeaponType),
          useValue: {
            find: jest.fn(),
            save: jest.fn(),
            create: jest.fn(),
            softDelete: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<WeaponTypeService>(WeaponTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
