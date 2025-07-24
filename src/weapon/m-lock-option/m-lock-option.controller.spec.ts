import { Test, TestingModule } from '@nestjs/testing';
import { MLockOptionController } from './m-lock-option.controller';
import { MLockOptionService } from './m-lock-option.service';

describe('MLockOptionController', () => {
  let controller: MLockOptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MLockOptionController],
      providers: [
        {
          provide: MLockOptionService,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MLockOptionController>(MLockOptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
