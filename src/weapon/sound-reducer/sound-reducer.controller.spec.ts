import { Test, TestingModule } from '@nestjs/testing';
import { SoundReducerController } from './sound-reducer.controller';

describe('SoundReducerController', () => {
  let controller: SoundReducerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SoundReducerController],
    }).compile();

    controller = module.get<SoundReducerController>(SoundReducerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
