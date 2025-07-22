import { Test, TestingModule } from '@nestjs/testing';
import { OpticTypeController } from './optic-type.controller';
import { OpticTypeService } from './optic-type.service';

describe('OpticTypeController', () => {
  let controller: OpticTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpticTypeController],
      providers: [
        {
          provide: OpticTypeService,
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

    controller = module.get<OpticTypeController>(OpticTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
