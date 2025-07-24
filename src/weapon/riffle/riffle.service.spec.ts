import { Test, TestingModule } from '@nestjs/testing';
import { RiffleService } from './riffle.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Riffle } from '../../database/entity/riffle.entity';

describe('RiffleService', () => {
  let service: RiffleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RiffleService,
        {
          provide: getRepositoryToken(Riffle),
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

    service = module.get<RiffleService>(RiffleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
