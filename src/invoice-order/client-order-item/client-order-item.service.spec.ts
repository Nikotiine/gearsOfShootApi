import { Test, TestingModule } from '@nestjs/testing';
import { ClientOrderItemService } from './client-order-item.service';

describe('ClientOrderItemService', () => {
  let service: ClientOrderItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientOrderItemService],
    }).compile();

    service = module.get<ClientOrderItemService>(ClientOrderItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
