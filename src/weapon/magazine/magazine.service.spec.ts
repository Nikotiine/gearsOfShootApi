import { Test, TestingModule } from '@nestjs/testing';
import { MagazineService } from './magazine.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { WeaponMagazine } from '../../database/entity/weapon-magazine.entity';

describe('MagazineService', () => {
  let service: MagazineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MagazineService,
        {
          provide: getRepositoryToken(WeaponMagazine),
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

    service = module.get<MagazineService>(MagazineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
