import { Test, TestingModule } from '@nestjs/testing';
import { SoundReducerService } from './sound-reducer.service';

describe('SoundReducerService', () => {
  let service: SoundReducerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SoundReducerService],
    }).compile();

    service = module.get<SoundReducerService>(SoundReducerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
