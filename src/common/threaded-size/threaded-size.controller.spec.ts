import { Test, TestingModule } from '@nestjs/testing';
import { ThreadedSizeController } from './threaded-size.controller';

describe('ThreadedSizeController', () => {
  let controller: ThreadedSizeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThreadedSizeController],
    }).compile();

    controller = module.get<ThreadedSizeController>(ThreadedSizeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
