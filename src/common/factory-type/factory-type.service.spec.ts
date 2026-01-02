import { Test, TestingModule } from '@nestjs/testing';
import { FactoryTypeService } from './factory-type.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FactoryType } from '../../database/entity/factory-type.entity';

describe('FactoryTypeService', () => {
  let service: FactoryTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FactoryTypeService,
        {
          provide: getRepositoryToken(FactoryType),
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FactoryTypeService>(FactoryTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
