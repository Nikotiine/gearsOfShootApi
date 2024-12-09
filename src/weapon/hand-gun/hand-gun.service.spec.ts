import { Test, TestingModule } from '@nestjs/testing';
import { HandGunService } from './hand-gun.service';

describe('HandGunService', () => {
  let service: HandGunService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HandGunService],
    }).compile();

    service = module.get<HandGunService>(HandGunService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
