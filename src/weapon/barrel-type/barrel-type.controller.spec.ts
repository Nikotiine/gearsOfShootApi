import { Test, TestingModule } from '@nestjs/testing';
import { BarrelTypeController } from './barrel-type.controller';

describe('BarrelTypeController', () => {
  let controller: BarrelTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BarrelTypeController],
    }).compile();

    controller = module.get<BarrelTypeController>(BarrelTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
