import { Test, TestingModule } from '@nestjs/testing';
import { BarrelTypeService } from './barrel-type.service';

describe('BarrelTypeService', () => {
  let service: BarrelTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BarrelTypeService],
    }).compile();

    service = module.get<BarrelTypeService>(BarrelTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
