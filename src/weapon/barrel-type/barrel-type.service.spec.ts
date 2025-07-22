import { Test, TestingModule } from '@nestjs/testing';
import { BarrelTypeService } from './barrel-type.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { WeaponBarrelType } from '../../database/entity/weapon-barrel-type.entity';

describe('BarrelTypeService', () => {
  let service: BarrelTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BarrelTypeService,
        {
          provide: getRepositoryToken(WeaponBarrelType),
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BarrelTypeService>(BarrelTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
