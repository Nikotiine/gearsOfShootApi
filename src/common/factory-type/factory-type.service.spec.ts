import { Test, TestingModule } from '@nestjs/testing';
import { FactoryTypeService } from './factory-type.service';

describe('FactoryTypeService', () => {
  let service: FactoryTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FactoryTypeService],
    }).compile();

    service = module.get<FactoryTypeService>(FactoryTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
