import { Test, TestingModule } from '@nestjs/testing';
import { PriceHistoryController } from './price-history.controller';

describe('PriceHistoryController', () => {
  let controller: PriceHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PriceHistoryController],
    }).compile();

    controller = module.get<PriceHistoryController>(PriceHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
