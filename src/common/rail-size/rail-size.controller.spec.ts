import { Test, TestingModule } from '@nestjs/testing';
import { RailSizeController } from './rail-size.controller';

describe('RailSizeController', () => {
  let controller: RailSizeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RailSizeController],
    }).compile();

    controller = module.get<RailSizeController>(RailSizeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
