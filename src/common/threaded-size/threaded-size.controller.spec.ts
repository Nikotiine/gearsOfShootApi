import { Test, TestingModule } from '@nestjs/testing';
import { ThreadedSizeController } from './threaded-size.controller';
import { ThreadedSizeService } from './threaded-size.service';

describe('ThreadedSizeController', () => {
  let controller: ThreadedSizeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThreadedSizeController],
      providers: [
        {
          provide: ThreadedSizeService,
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

    controller = module.get<ThreadedSizeController>(ThreadedSizeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
