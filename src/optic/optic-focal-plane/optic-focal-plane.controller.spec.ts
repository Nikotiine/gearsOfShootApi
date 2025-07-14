import { Test, TestingModule } from '@nestjs/testing';
import { OpticFocalPlaneController } from './optic-focal-plane.controller';

describe('OpticFocalPlaneController', () => {
  let controller: OpticFocalPlaneController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpticFocalPlaneController],
    }).compile();

    controller = module.get<OpticFocalPlaneController>(OpticFocalPlaneController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
