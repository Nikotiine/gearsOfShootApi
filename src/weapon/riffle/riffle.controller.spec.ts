import { Test, TestingModule } from '@nestjs/testing';
import { RiffleController } from './riffle.controller';

describe('RiffleController', () => {
  let controller: RiffleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RiffleController],
    }).compile();

    controller = module.get<RiffleController>(RiffleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
