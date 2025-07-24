import { Test, TestingModule } from '@nestjs/testing';
import { MaterialController } from './material.controller';
import { MaterialService } from './material.service';

describe('MaterialController', () => {
  let controller: MaterialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaterialController],
      providers: [
        {
          provide: MaterialService,
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

    controller = module.get<MaterialController>(MaterialController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
