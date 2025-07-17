import { Test, TestingModule } from '@nestjs/testing';
import { PriceHistoryService } from './price-history.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PriceHistory } from '../../database/entity/price-history.entity';

describe('PriceHistoryService', () => {
  let service: PriceHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PriceHistoryService,
        {
          provide: getRepositoryToken(PriceHistory),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PriceHistoryService>(PriceHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
