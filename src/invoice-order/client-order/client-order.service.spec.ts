import { Test, TestingModule } from '@nestjs/testing';
import { ClientOrderService } from './client-order.service';

describe('ClientOrderService', () => {
  let service: ClientOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientOrderService],
    }).compile();

    service = module.get<ClientOrderService>(ClientOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
