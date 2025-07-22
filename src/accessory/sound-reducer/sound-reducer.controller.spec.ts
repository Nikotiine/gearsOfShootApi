import { Test, TestingModule } from '@nestjs/testing';
import { SoundReducerController } from './sound-reducer.controller';
import { SoundReducerService } from './sound-reducer.service';

describe('SoundReducerController', () => {
  let controller: SoundReducerController;
  let service: jest.Mocked<SoundReducerService>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SoundReducerController],
      providers: [
        {
          provide: SoundReducerService,
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

    controller = module.get<SoundReducerController>(SoundReducerController);
    service = module.get(SoundReducerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
