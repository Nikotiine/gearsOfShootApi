import { Test, TestingModule } from '@nestjs/testing';
import { TriggerTypeService } from './trigger-type.service';

describe('TriggerTypeService', () => {
  let service: TriggerTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TriggerTypeService],
    }).compile();

    service = module.get<TriggerTypeService>(TriggerTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
