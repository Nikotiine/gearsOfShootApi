import { Test, TestingModule } from '@nestjs/testing';
import { OpticCollarService } from './optic-collar.service';

describe('OpticCollarService', () => {
  let service: OpticCollarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpticCollarService],
    }).compile();

    service = module.get<OpticCollarService>(OpticCollarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
