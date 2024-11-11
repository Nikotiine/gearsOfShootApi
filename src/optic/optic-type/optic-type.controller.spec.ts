import { Test, TestingModule } from '@nestjs/testing';
import { OpticTypeController } from './optic-type.controller';

describe('OpticTypeController', () => {
  let controller: OpticTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpticTypeController],
    }).compile();

    controller = module.get<OpticTypeController>(OpticTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
