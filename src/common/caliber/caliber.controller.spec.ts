import { Test, TestingModule } from '@nestjs/testing';
import { CaliberController } from './caliber.controller';
import { CaliberService } from './caliber.service';

describe('CaliberController', () => {
  let controller: CaliberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CaliberController],
      providers: [
        {
          provide: CaliberService,
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

    controller = module.get<CaliberController>(CaliberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
