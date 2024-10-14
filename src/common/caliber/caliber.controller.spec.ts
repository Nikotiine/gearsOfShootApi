import { Test, TestingModule } from '@nestjs/testing';
import { CaliberController } from './caliber.controller';

describe('CaliberController', () => {
  let controller: CaliberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CaliberController],
    }).compile();

    controller = module.get<CaliberController>(CaliberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
