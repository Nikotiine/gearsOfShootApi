import { Test, TestingModule } from '@nestjs/testing';
import { LegislationCategoryController } from './legislation-category.controller';

describe('LegislationCategoryController', () => {
  let controller: LegislationCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LegislationCategoryController],
    }).compile();

    controller = module.get<LegislationCategoryController>(LegislationCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
