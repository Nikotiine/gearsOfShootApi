import { Test, TestingModule } from '@nestjs/testing';
import { AmmunitionBodyTypeController } from './ammunition-body-type.controller';
import { AmmunitionBodyTypeService } from './ammunition-body-type.service';

describe('AmmunitionBodyTypeController', () => {
  let controller: AmmunitionBodyTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AmmunitionBodyTypeController],
      providers: [
        {
          provide: AmmunitionBodyTypeService,
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

    controller = module.get<AmmunitionBodyTypeController>(
      AmmunitionBodyTypeController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
