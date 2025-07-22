import { Test, TestingModule } from '@nestjs/testing';
import { RailSizeController } from './rail-size.controller';
import { RailSizeService } from './rail-size.service';

describe('RailSizeController', () => {
  let controller: RailSizeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RailSizeController],
      providers: [
        {
          provide: RailSizeService,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<RailSizeController>(RailSizeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
