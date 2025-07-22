import { Test, TestingModule } from '@nestjs/testing';
import { AmmunitionController } from './ammunition.controller';
import { AmmunitionService } from './ammunition.service';

describe('AmmunitionController', () => {
  let controller: AmmunitionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AmmunitionController],
      providers: [
        {
          provide: AmmunitionService,
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

    controller = module.get<AmmunitionController>(AmmunitionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
