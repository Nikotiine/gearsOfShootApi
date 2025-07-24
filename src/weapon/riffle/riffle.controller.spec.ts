import { Test, TestingModule } from '@nestjs/testing';
import { RiffleController } from './riffle.controller';
import { RiffleService } from './riffle.service';

describe('RiffleController', () => {
  let controller: RiffleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RiffleController],
      providers: [
        {
          provide: RiffleService,
          useValue: {
            findAll: jest.fn(),
            findById: jest.fn(),
            insert: jest.fn(),
            edit: jest.fn(),
            delete: jest.fn(),
            findAllByCategory: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<RiffleController>(RiffleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
