import { Test, TestingModule } from '@nestjs/testing';
import { OpticUnitController } from './optic-unit.controller';

describe('OpticUnitController', () => {
  let controller: OpticUnitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpticUnitController],
    }).compile();

    controller = module.get<OpticUnitController>(OpticUnitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
