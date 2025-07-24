import { Test, TestingModule } from '@nestjs/testing';
import { OpticCollarService } from './optic-collar.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OpticCollar } from '../../database/entity/optic-collar.entity';

describe('OpticCollarService', () => {
  let service: OpticCollarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OpticCollarService,
        {
          provide: getRepositoryToken(OpticCollar),
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

    service = module.get<OpticCollarService>(OpticCollarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
