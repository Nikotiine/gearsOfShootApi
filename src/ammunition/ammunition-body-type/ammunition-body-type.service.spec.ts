import { Test, TestingModule } from '@nestjs/testing';
import { AmmunitionBodyTypeService } from './ammunition-body-type.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AmmunitionBodyType } from '../../database/entity/ammunition-body-type.entity';

describe('AmmunitionBodyTypeService', () => {
  let service: AmmunitionBodyTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AmmunitionBodyTypeService,
        {
          provide: getRepositoryToken(AmmunitionBodyType),
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

    service = module.get<AmmunitionBodyTypeService>(AmmunitionBodyTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
