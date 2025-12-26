import { Test, TestingModule } from '@nestjs/testing';
import { FactoryService } from './factory.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Factory } from '../../database/entity/factory.entity';

describe('FactoryService', () => {
  let service: FactoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FactoryService,
        {
          provide: getRepositoryToken(Factory),
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

    service = module.get<FactoryService>(FactoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
