import { Test, TestingModule } from '@nestjs/testing';
import { OpticTypeService } from './optic-type.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OpticType } from '../../database/entity/optic-type.entity';

describe('OpticTypeService', () => {
  let service: OpticTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OpticTypeService,
        {
          provide: getRepositoryToken(OpticType),
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

    service = module.get<OpticTypeService>(OpticTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
