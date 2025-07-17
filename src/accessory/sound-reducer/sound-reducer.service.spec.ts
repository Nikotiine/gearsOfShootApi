import { Test, TestingModule } from '@nestjs/testing';
import { SoundReducerService } from './sound-reducer.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SoundNoiseReducer } from '../../database/entity/sound-noise-reducer.entity';
import { PriceHistoryService } from '../../common/price-history/price-history.service';

describe('SoundReducerService', () => {
  let service: SoundReducerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SoundReducerService,
        {
          provide: getRepositoryToken(SoundNoiseReducer),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            softDelete: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: PriceHistoryService,
          useValue: {
            addPriceHistory: jest.fn(),
            findLastByObjectId: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SoundReducerService>(SoundReducerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
