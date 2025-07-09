import { Test, TestingModule } from '@nestjs/testing';
import { ReloadModeController } from './reload-mode.controller';

describe('ReloadModeController', () => {
  let controller: ReloadModeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReloadModeController],
    }).compile();

    controller = module.get<ReloadModeController>(ReloadModeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
