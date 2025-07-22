import { Test, TestingModule } from '@nestjs/testing';
import { OpticReadyPlateService } from './optic-ready-plate.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OpticReadyPlate } from '../../database/entity/optic-ready-plate.entity';

describe('OpticReadyPlateService', () => {
  let service: OpticReadyPlateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OpticReadyPlateService,
        {
          provide: getRepositoryToken(OpticReadyPlate),
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

    service = module.get<OpticReadyPlateService>(OpticReadyPlateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
