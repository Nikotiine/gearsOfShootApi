import { Test, TestingModule } from '@nestjs/testing';
import { MagazineController } from './magazine.controller';
import { MagazineService } from './magazine.service';

describe('MagazineController', () => {
  let controller: MagazineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MagazineController],
      providers: [
        {
          provide: MagazineService,
          useValue: {
            findAll: jest.fn(),
            findById: jest.fn(),
            insert: jest.fn(),
            edit: jest.fn(),
            delete: jest.fn(),
            findByFactory: jest.fn(),
            findByCategory: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MagazineController>(MagazineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
