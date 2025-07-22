import { Test, TestingModule } from '@nestjs/testing';
import { AmmunitionHeadTypeService } from './ammunition-head-type.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AmmunitionHeadType } from '../../database/entity/ammunition-head-type.entity';

describe('AmmunitionHeadTypeService', () => {
  let service: AmmunitionHeadTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AmmunitionHeadTypeService,
        {
          provide: getRepositoryToken(AmmunitionHeadType),
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

    service = module.get<AmmunitionHeadTypeService>(AmmunitionHeadTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
