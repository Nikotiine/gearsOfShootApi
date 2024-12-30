import { Test, TestingModule } from '@nestjs/testing';
import { OpticCollarController } from './optic-collar.controller';

describe('OpticCollarController', () => {
  let controller: OpticCollarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpticCollarController],
    }).compile();

    controller = module.get<OpticCollarController>(OpticCollarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
