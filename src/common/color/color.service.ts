import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Color } from '../../database/entity/color.entity';
import { Repository } from 'typeorm';
import { ColorDto } from '../../dto/color.dto';

@Injectable()
export class ColorService {
  constructor(
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,
  ) {}

  public async findAll(): Promise<ColorDto[]> {
    const colors = await this.colorRepository.find({
      select: {
        name: true,
        reference: true,
        id: true,
      },
    });
    return colors.map((color) => {
      return {
        id: color.id,
        name: color.name,
        reference: color.reference,
      };
    });
  }
}
