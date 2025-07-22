import { Test, TestingModule } from '@nestjs/testing';
import { MLockOptionService } from './m-lock-option.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MLockOption } from '../../database/entity/m-lock-option.entity';

describe('MLockOptionService', () => {
  let service: MLockOptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MLockOptionService,
        {
          provide: getRepositoryToken(MLockOption),
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MLockOptionService>(MLockOptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
