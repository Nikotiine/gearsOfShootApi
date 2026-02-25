import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from '../../database/entity/address.entity';
import { AddressDto } from '../../dto/address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressService: Repository<Address>,
  ) {}

  public mapEntityToDto(entity: Address): AddressDto {
    return {
      ...entity,
    };
  }

  public mapArrayEntityToArrayDto(entities: Address[]): AddressDto[] {
    return entities.map((address) => this.mapEntityToDto(address));
  }
}
