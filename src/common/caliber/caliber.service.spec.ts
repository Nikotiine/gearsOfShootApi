import { Test, TestingModule } from '@nestjs/testing';
import { CaliberService } from './caliber.service';

describe('CaliberService', () => {
  let service: CaliberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CaliberService],
    }).compile();

    service = module.get<CaliberService>(CaliberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
