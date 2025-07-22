import { Test, TestingModule } from '@nestjs/testing';
import { LegislationCategoryService } from './legislation-category.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LegislationCategory } from '../../database/entity/legislation-category.entity';

describe('LegislationCategoryService', () => {
  let service: LegislationCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LegislationCategoryService,
        {
          provide: getRepositoryToken(LegislationCategory),
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<LegislationCategoryService>(
      LegislationCategoryService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
