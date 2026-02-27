import { Test, TestingModule } from '@nestjs/testing';
import { CartCronService } from './cart.cron.service';

describe('CartCronService', () => {
  let service: CartCronService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartCronService],
    }).compile();

    service = module.get<CartCronService>(CartCronService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
