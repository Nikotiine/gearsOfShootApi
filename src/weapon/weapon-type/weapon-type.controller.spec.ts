import { Test, TestingModule } from '@nestjs/testing';
import { WeaponTypeController } from './weapon-type.controller';
import { WeaponTypeService } from './weapon-type.service';

describe('WeaponTypeController', () => {
  let controller: WeaponTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeaponTypeController],
      providers: [
        {
          provide: WeaponTypeService,
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

    controller = module.get<WeaponTypeController>(WeaponTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
