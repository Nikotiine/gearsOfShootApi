import { Test, TestingModule } from '@nestjs/testing';
import { OpticTypeService } from './optic-type.service';

describe('OpticTypeService', () => {
  let service: OpticTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpticTypeService],
    }).compile();

    service = module.get<OpticTypeService>(OpticTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
