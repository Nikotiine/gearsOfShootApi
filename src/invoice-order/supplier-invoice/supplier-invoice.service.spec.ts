import { Test, TestingModule } from '@nestjs/testing';
import { SupplierInvoiceService } from './supplier-invoice.service';

describe('SupplierInvoiceService', () => {
  let service: SupplierInvoiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupplierInvoiceService],
    }).compile();

    service = module.get<SupplierInvoiceService>(SupplierInvoiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
