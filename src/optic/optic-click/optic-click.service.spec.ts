import { Test, TestingModule } from '@nestjs/testing';
import { OpticClickService } from './optic-click.service';

describe('OpticClickService', () => {
  let service: OpticClickService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpticClickService],
    }).compile();

    service = module.get<OpticClickService>(OpticClickService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
