import { Test, TestingModule } from '@nestjs/testing';
import { ReloadModeController } from './reload-mode.controller';
import { ReloadModeService } from './reload-mode.service';

describe('ReloadModeController', () => {
  let controller: ReloadModeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReloadModeController],
      providers: [
        {
          provide: ReloadModeService,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ReloadModeController>(ReloadModeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
