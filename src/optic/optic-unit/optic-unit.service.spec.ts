import { Test, TestingModule } from '@nestjs/testing';
import { OpticUnitService } from './optic-unit.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OpticUnit } from '../../database/entity/optic-unit.entity';

describe('OpticUnitService', () => {
  let service: OpticUnitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OpticUnitService,
        {
          provide: getRepositoryToken(OpticUnit),
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<OpticUnitService>(OpticUnitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
