import { Test, TestingModule } from '@nestjs/testing';
import { ThreadedSizeService } from './threaded-size.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ThreadedSize } from '../../database/entity/threaded-size.entity';

describe('ThreadedSizeService', () => {
  let service: ThreadedSizeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ThreadedSizeService,
        {
          provide: getRepositoryToken(ThreadedSize),
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

    service = module.get<ThreadedSizeService>(ThreadedSizeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
