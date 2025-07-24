import { Test, TestingModule } from '@nestjs/testing';
import { OpticService } from './optic.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Optic } from '../database/entity/optic.entity';

describe('OpticService', () => {
  let service: OpticService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OpticService,
        {
          provide: getRepositoryToken(Optic),
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

    service = module.get<OpticService>(OpticService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
