import { Test, TestingModule } from '@nestjs/testing';
import { OpticUnitController } from './optic-unit.controller';
import { OpticUnitService } from './optic-unit.service';

describe('OpticUnitController', () => {
  let controller: OpticUnitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpticUnitController],
      providers: [
        {
          provide: OpticUnitService,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<OpticUnitController>(OpticUnitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
