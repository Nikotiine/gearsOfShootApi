import { Test, TestingModule } from '@nestjs/testing';
import { OpticController } from './optic.controller';

describe('OpticController', () => {
  let controller: OpticController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpticController],
    }).compile();

    controller = module.get<OpticController>(OpticController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
