import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Color } from '../../database/entity/color.entity';
import { Repository } from 'typeorm';
import { ColorDto, CreateColorDto } from '../../dto/color.dto';
import { CodeError } from '../../enum/code-error.enum';
import { ApiDeleteResponseDto } from '../../dto/api-response.dto';
import { CodeSuccess } from '../../enum/code-success.enum';

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

  public async insert(color: CreateColorDto): Promise<ColorDto> {
    const isExist = await this.colorRepository.findOne({
      where: {
        name: color.name,
      },
    });
    if (isExist) {
      throw new BadRequestException(CodeError.COLOR_NAME_IS_USED);
    }
    const entity = this.colorRepository.create(color);
    const created = await this.colorRepository.save(entity);
    return {
      id: created.id,
      name: created.name,
      reference: created.reference,
    };
  }

  public async findById(id: number): Promise<ColorDto> {
    const color = await this.colorRepository.findOne({
      where: {
        id: id,
      },
    });
    return {
      id: color.id,
      name: color.name,
      reference: color.reference,
    };
  }

  public async edit(id: number, color: ColorDto) {
    const updateResult = await this.colorRepository.update(id, {
      id: id,
      name: color.name,
      reference: color.reference,
    });
    if (updateResult.affected === 0) {
      throw new BadRequestException(CodeError.COLOR_UPDATE_FAILED);
    }
    return this.findById(id);
  }
  /**
   * Soft delete de la marque
   * @param id {number} id de la marque
   */
  public async delete(id: number): Promise<ApiDeleteResponseDto> {
    const deleted = await this.colorRepository.softDelete(id);
    return {
      id: id,
      isSuccess: deleted.affected > 0,
      message: CodeSuccess.COLOR_DELETE,
    };
  }
}
