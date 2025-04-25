import { Test, TestingModule } from '@nestjs/testing';
import { TriggerTypeController } from './trigger-type.controller';

describe('TriggerTypeController', () => {
  let controller: TriggerTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TriggerTypeController],
    }).compile();

    controller = module.get<TriggerTypeController>(TriggerTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
