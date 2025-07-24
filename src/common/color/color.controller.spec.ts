import { Test, TestingModule } from '@nestjs/testing';
import { ColorController } from './color.controller';
import { ColorService } from './color.service';

describe('ColorController', () => {
  let controller: ColorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ColorController],
      providers: [
        {
          provide: ColorService,
          useValue: {
            findAll: jest.fn(),
            findById: jest.fn(),
            insert: jest.fn(),
            edit: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ColorController>(ColorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
