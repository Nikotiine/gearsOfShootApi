import { Test, TestingModule } from '@nestjs/testing';
import { OpticFocalPlaneService } from './optic-focal-plane.service';

describe('OpticFocalPlaneService', () => {
  let service: OpticFocalPlaneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpticFocalPlaneService],
    }).compile();

    service = module.get<OpticFocalPlaneService>(OpticFocalPlaneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
