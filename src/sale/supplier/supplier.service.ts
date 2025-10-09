import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from '../../database/entity/supplier.entity';
import { Repository } from 'typeorm';
import { SupplierDto } from '../../dto/supplier.dto';

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
  ) {}

  public async findAll(): Promise<SupplierDto[]> {
    return this.supplierRepository.find();
  }
}
