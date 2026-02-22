import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../database/entity/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateUserDto, UserDto } from '../dto/user.dto';
import { CodeError } from '../enum/code-error.enum';
import { UserFilter } from './filters/users.filter';
import { buildWhereGeneric } from '../database/utils/where-builder';
import { usersWhereFilterConfig } from './filters/users-where-filter.config';
import { PaginatedResponseDto } from '../decorator/paginated-response.decorator';
import { AddressService } from '../common/address/address.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly addressService: AddressService,
  ) {}

  /**
   * Trouve un utilisateur par son email
   * @param email {string} de l'utilisateur
   */
  public async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  public async insert(user: CreateUserDto): Promise<UserDto> {
    const isExist: User = await this.findOneByEmail(user.email);
    if (isExist) {
      throw new BadRequestException(CodeError.EMAIL_IS_USED);
    }
    const entity = this.userRepository.create({
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
      email: user.email,
      phone: user.phone,
      role: user.role,
    });
    const created = await this.userRepository.save(entity);
    return this.mapEntityToDto(created);
  }

  public async findById(id: number): Promise<UserDto> {
    const user: User = await this.userRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        addresses: true,
      },
    });
    return this.mapEntityToDto(user);
  }

  public async findAll(
    filter: UserFilter,
  ): Promise<PaginatedResponseDto<UserDto>> {
    const { limit, offset } = filter;
    const where: FindOptionsWhere<User> = buildWhereGeneric<UserFilter, User>(
      filter,
      usersWhereFilterConfig,
    );
    const [entities, total] = await this.userRepository.findAndCount({
      where,
      take: limit,
      skip: offset,
      order: {
        id: 'DESC',
      },
      relations: {
        addresses: true,
      },
    });
    const data = this.mapEntityArrayToDtoArray(entities);
    return new PaginatedResponseDto<UserDto>(data, total, limit, offset);
  }

  private mapEntityArrayToDtoArray(entityArray: User[]): UserDto[] {
    return entityArray.map((user) => this.mapEntityToDto(user));
  }

  public mapEntityToDto(entity: User): UserDto {
    if (!entity) {
      return null;
    }
    return {
      id: entity.id,
      firstName: entity.firstName,
      lastName: entity.lastName,
      phone: entity.phone,
      email: entity.email,
      role: entity.role,
      costumerRoles: entity.costumerRole,
      addresses:
        entity.addresses && entity.addresses.length > 0
          ? this.addressService.mapArrayEntityToArrayDto(entity.addresses)
          : [],
    };
  }
}
