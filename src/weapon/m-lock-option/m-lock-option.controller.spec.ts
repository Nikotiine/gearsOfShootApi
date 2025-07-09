import { Test, TestingModule } from '@nestjs/testing';
import { MLockOptionController } from './m-lock-option.controller';

describe('MLockOptionController', () => {
  let controller: MLockOptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MLockOptionController],
    }).compile();

    controller = module.get<MLockOptionController>(MLockOptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
