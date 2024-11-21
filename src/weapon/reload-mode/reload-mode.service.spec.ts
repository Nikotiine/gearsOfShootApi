import { Test, TestingModule } from '@nestjs/testing';
import { ReloadModeService } from './reload-mode.service';

describe('ReloadModeService', () => {
  let service: ReloadModeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReloadModeService],
    }).compile();

    service = module.get<ReloadModeService>(ReloadModeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
