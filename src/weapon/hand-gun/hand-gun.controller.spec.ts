import { Test, TestingModule } from '@nestjs/testing';
import { HandGunController } from './hand-gun.controller';

describe('HandGunController', () => {
  let controller: HandGunController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HandGunController],
    }).compile();

    controller = module.get<HandGunController>(HandGunController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
