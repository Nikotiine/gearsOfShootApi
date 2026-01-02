import { Test, TestingModule } from '@nestjs/testing';
import { DiscountItemsService } from './discount-items.service';

describe('DiscountItemsService', () => {
  let service: DiscountItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiscountItemsService],
    }).compile();

    service = module.get<DiscountItemsService>(DiscountItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
