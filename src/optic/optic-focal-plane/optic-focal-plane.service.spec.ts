import { Test, TestingModule } from '@nestjs/testing';
import { OpticFocalPlaneService } from './optic-focal-plane.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OpticFocalPlane } from '../../database/entity/optic-focal-plane.entity';

describe('OpticFocalPlaneService', () => {
  let service: OpticFocalPlaneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OpticFocalPlaneService,
        {
          provide: getRepositoryToken(OpticFocalPlane),
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<OpticFocalPlaneService>(OpticFocalPlaneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
