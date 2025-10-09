import { Test, TestingModule } from '@nestjs/testing';
import { SupplierInvoiceController } from './supplier-invoice.controller';

describe('SupplierInvoiceController', () => {
  let controller: SupplierInvoiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupplierInvoiceController],
    }).compile();

    controller = module.get<SupplierInvoiceController>(SupplierInvoiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
