import { Test, TestingModule } from '@nestjs/testing';
import { LegislationCategoryService } from './legislation-category.service';

describe('LegislationCategoryService', () => {
  let service: LegislationCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LegislationCategoryService],
    }).compile();

    service = module.get<LegislationCategoryService>(LegislationCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
