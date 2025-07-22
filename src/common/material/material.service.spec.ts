import { Test, TestingModule } from '@nestjs/testing';
import { MaterialService } from './material.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Material } from '../../database/entity/material.entity';

describe('MaterialService', () => {
  let service: MaterialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MaterialService,
        {
          provide: getRepositoryToken(Material),
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

    service = module.get<MaterialService>(MaterialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
