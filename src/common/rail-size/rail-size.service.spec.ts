import { Test, TestingModule } from '@nestjs/testing';
import { RailSizeService } from './rail-size.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RailSize } from '../../database/entity/rail-size.entity';

describe('RailSizeService', () => {
  let service: RailSizeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RailSizeService,
        {
          provide: getRepositoryToken(RailSize),
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RailSizeService>(RailSizeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
