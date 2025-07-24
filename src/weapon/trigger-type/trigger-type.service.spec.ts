import { Test, TestingModule } from '@nestjs/testing';
import { TriggerTypeService } from './trigger-type.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TriggerType } from '../../database/entity/trigger-type.entity';

describe('TriggerTypeService', () => {
  let service: TriggerTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TriggerTypeService,
        {
          provide: getRepositoryToken(TriggerType),
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TriggerTypeService>(TriggerTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
