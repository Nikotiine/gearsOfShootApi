import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../database/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UserDto } from '../dto/user.dto';
import { CodeError } from '../enum/code-error.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
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
    const isExist = await this.findOneByEmail(user.email);
    if (isExist) {
      throw new BadRequestException(CodeError.EMAIL_IS_USED);
    }
    const entity = this.userRepository.create({
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
      email: user.email,
      address: user.address,
      phone: user.phone,
      city: user.city,
      state: user.state,
      zipCode: user.zipCode,
      role: user.role,
    });
    const created = await this.userRepository.save(entity);
    return created;
  }

  public async findById(id: number): Promise<UserDto> {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      city: user.city,
      phone: user.phone,
      email: user.email,
      state: user.state,
      zipCode: user.zipCode,
      role: user.role,
    };
  }
}
