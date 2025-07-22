import { Test, TestingModule } from '@nestjs/testing';
import { AmmunitionHeadTypeController } from './ammunition-head-type.controller';
import { AmmunitionHeadTypeService } from './ammunition-head-type.service';

describe('AmmunitionHeadTypeController', () => {
  let controller: AmmunitionHeadTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AmmunitionHeadTypeController],
      providers: [
        {
          provide: AmmunitionHeadTypeService,
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

    controller = module.get<AmmunitionHeadTypeController>(
      AmmunitionHeadTypeController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
