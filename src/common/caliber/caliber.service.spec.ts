import { Test, TestingModule } from '@nestjs/testing';
import { CaliberService } from './caliber.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Caliber } from '../../database/entity/caliber.entity';

describe('CaliberService', () => {
  let service: CaliberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CaliberService,
        {
          provide: getRepositoryToken(Caliber),
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

    service = module.get<CaliberService>(CaliberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
