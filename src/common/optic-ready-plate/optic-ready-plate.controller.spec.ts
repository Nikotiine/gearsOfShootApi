import { Test, TestingModule } from '@nestjs/testing';
import { OpticReadyPlateController } from './optic-ready-plate.controller';
import { OpticReadyPlateService } from './optic-ready-plate.service';

describe('OpticReadyPlateController', () => {
  let controller: OpticReadyPlateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpticReadyPlateController],
      providers: [
        {
          provide: OpticReadyPlateService,
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

    controller = module.get<OpticReadyPlateController>(
      OpticReadyPlateController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
