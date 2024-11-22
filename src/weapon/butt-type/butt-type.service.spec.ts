import { Test, TestingModule } from '@nestjs/testing';
import { ButtTypeService } from './butt-type.service';

describe('ButtTypeService', () => {
  let service: ButtTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ButtTypeService],
    }).compile();

    service = module.get<ButtTypeService>(ButtTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
