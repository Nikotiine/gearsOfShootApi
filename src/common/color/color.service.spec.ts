import { Test, TestingModule } from '@nestjs/testing';
import { ColorService } from './color.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AmmunitionHeadType } from '../../database/entity/ammunition-head-type.entity';
import { Color } from '../../database/entity/color.entity';

describe('ColorService', () => {
  let service: ColorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ColorService,
        {
          provide: getRepositoryToken(Color),
          useValue: {
            find: jest.fn(),
            save: jest.fn(),
            create: jest.fn(),
            softDelete: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ColorService>(ColorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
