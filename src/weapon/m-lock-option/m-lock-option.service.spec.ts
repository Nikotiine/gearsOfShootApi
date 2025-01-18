import { Test, TestingModule } from '@nestjs/testing';
import { MLockOptionService } from './m-lock-option.service';

describe('MLockOptionService', () => {
  let service: MLockOptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MLockOptionService],
    }).compile();

    service = module.get<MLockOptionService>(MLockOptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
