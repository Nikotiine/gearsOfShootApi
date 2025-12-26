import { Test, TestingModule } from '@nestjs/testing';
import { NewItemsService } from './new-items.service';

describe('NewItemsService', () => {
  let service: NewItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewItemsService],
    }).compile();

    service = module.get<NewItemsService>(NewItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
