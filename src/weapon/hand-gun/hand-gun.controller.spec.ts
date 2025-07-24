import { Test, TestingModule } from '@nestjs/testing';
import { HandGunController } from './hand-gun.controller';
import { HandGunService } from './hand-gun.service';

describe('HandGunController', () => {
  let controller: HandGunController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HandGunController],
      providers: [
        {
          provide: HandGunService,
          useValue: {
            findAll: jest.fn(),
            findById: jest.fn(),
            insert: jest.fn(),
            edit: jest.fn(),
            delete: jest.fn(),
            findAllByCategory: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<HandGunController>(HandGunController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
