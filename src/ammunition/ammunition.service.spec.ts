import { Test, TestingModule } from '@nestjs/testing';
import { AmmunitionService } from './ammunition.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Ammunition } from '../database/entity/ammunition.entity';

describe('AmmunitionService', () => {
  let service: AmmunitionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AmmunitionService,
        {
          provide: getRepositoryToken(Ammunition),
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

    service = module.get<AmmunitionService>(AmmunitionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
