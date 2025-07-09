import { Test, TestingModule } from '@nestjs/testing';
import { OpticReadyPlateController } from './optic-ready-plate.controller';

describe('OpticReadyPlateController', () => {
  let controller: OpticReadyPlateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpticReadyPlateController],
    }).compile();

    controller = module.get<OpticReadyPlateController>(OpticReadyPlateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
