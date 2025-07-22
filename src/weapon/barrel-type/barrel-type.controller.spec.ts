import { Test, TestingModule } from '@nestjs/testing';
import { BarrelTypeController } from './barrel-type.controller';
import { BarrelTypeService } from './barrel-type.service';

describe('BarrelTypeController', () => {
  let controller: BarrelTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BarrelTypeController],
      providers: [
        {
          provide: BarrelTypeService,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BarrelTypeController>(BarrelTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
