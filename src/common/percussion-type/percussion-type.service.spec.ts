import { Test, TestingModule } from '@nestjs/testing';
import { PercussionTypeService } from './percussion-type.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PercussionType } from '../../database/entity/percussion-type.entity';

describe('PercussionTypeService', () => {
  let service: PercussionTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PercussionTypeService,
        {
          provide: getRepositoryToken(PercussionType),
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PercussionTypeService>(PercussionTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
