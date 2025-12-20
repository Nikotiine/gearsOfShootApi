import { Test, TestingModule } from '@nestjs/testing';
import { FactoryTypeController } from './factory-type.controller';

describe('FactoryTypeController', () => {
  let controller: FactoryTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FactoryTypeController],
    }).compile();

    controller = module.get<FactoryTypeController>(FactoryTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
