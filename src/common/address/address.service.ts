import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from '../../database/entity/address.entity';
import { AddressDto } from '../../dto/address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  public mapEntityToDto(entity: Address): AddressDto {
    return {
      ...entity,
    };
  }

  public mapArrayEntityToArrayDto(entities: Address[]): AddressDto[] {
    return entities.map((address) => this.mapEntityToDto(address));
  }

  public async addAddressToUser(
    address: AddressDto,
    userId: number,
  ): Promise<AddressDto> {
    const entity = this.addressRepository.create({
      ...address,
      userAddress: {
        id: userId,
      },
    });
    const saved = await this.addressRepository.save(entity);
    return this.mapEntityToDto(saved);
  }

  public async findAllAddressByUserId(userId: number): Promise<AddressDto[]> {
    const entities: Address[] = await this.addressRepository.find({
      where: {
        userAddress: {
          id: userId,
        },
      },
    });
    return this.mapArrayEntityToArrayDto(entities);
  }
}
