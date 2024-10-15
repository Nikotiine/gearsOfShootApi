import { Test, TestingModule } from '@nestjs/testing';
import { AmmunitionBodyTypeController } from './ammunition-body-type.controller';

describe('AmmunitionBodyTypeController', () => {
  let controller: AmmunitionBodyTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AmmunitionBodyTypeController],
    }).compile();

    controller = module.get<AmmunitionBodyTypeController>(AmmunitionBodyTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
