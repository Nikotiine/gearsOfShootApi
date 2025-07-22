import { Test, TestingModule } from '@nestjs/testing';
import { OpticFocalPlaneController } from './optic-focal-plane.controller';
import { OpticFocalPlaneService } from './optic-focal-plane.service';

describe('OpticFocalPlaneController', () => {
  let controller: OpticFocalPlaneController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpticFocalPlaneController],
      providers: [
        {
          provide: OpticFocalPlaneService,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<OpticFocalPlaneController>(
      OpticFocalPlaneController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
