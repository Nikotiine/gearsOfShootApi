import { Test, TestingModule } from '@nestjs/testing';
import { OpticClickController } from './optic-click.controller';

describe('OpticClickController', () => {
  let controller: OpticClickController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpticClickController],
    }).compile();

    controller = module.get<OpticClickController>(OpticClickController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
