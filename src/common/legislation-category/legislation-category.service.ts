import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LegislationCategory } from '../../database/entity/legislation-category.entity';
import { Repository } from 'typeorm';
import { LegislationCategoryDto } from '../../dto/legislation-category.dto';

@Injectable()
export class LegislationCategoryService {
  constructor(
    @InjectRepository(LegislationCategory)
    private readonly legislationCategoryRepository: Repository<LegislationCategory>,
  ) {}

  public async findAll(): Promise<LegislationCategoryDto[]> {
    const categories = await this.legislationCategoryRepository.find();
    return categories.map((category) => {
      return {
        id: category.id,
        name: category.name,
      };
    });
  }
}
