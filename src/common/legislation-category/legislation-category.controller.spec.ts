import { Test, TestingModule } from '@nestjs/testing';
import { LegislationCategoryController } from './legislation-category.controller';
import { LegislationCategoryService } from './legislation-category.service';

describe('LegislationCategoryController', () => {
  let controller: LegislationCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LegislationCategoryController],
      providers: [
        {
          provide: LegislationCategoryService,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<LegislationCategoryController>(
      LegislationCategoryController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
