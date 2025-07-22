import { Test, TestingModule } from '@nestjs/testing';
import { ReloadModeService } from './reload-mode.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { WeaponReloadMode } from '../../database/entity/weapon-reload-mode.entity';

describe('ReloadModeService', () => {
  let service: ReloadModeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReloadModeService,
        {
          provide: getRepositoryToken(WeaponReloadMode),
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ReloadModeService>(ReloadModeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
