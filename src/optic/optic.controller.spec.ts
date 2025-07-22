import { Test, TestingModule } from '@nestjs/testing';
import { OpticController } from './optic.controller';
import { OpticService } from './optic.service';

describe('OpticController', () => {
  let controller: OpticController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpticController],
      providers: [
        {
          provide: OpticService,
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

    controller = module.get<OpticController>(OpticController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
