import { Test, TestingModule } from '@nestjs/testing';
import { FactoryController } from './factory.controller';

describe('FactoryController', () => {
  let controller: FactoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FactoryController],
    }).compile();

    controller = module.get<FactoryController>(FactoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
