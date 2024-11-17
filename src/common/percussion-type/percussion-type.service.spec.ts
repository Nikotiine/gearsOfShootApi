import { Test, TestingModule } from '@nestjs/testing';
import { PercussionTypeService } from './percussion-type.service';

describe('PercussionTypeService', () => {
  let service: PercussionTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PercussionTypeService],
    }).compile();

    service = module.get<PercussionTypeService>(PercussionTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
