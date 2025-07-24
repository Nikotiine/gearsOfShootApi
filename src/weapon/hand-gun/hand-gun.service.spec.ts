import { Test, TestingModule } from '@nestjs/testing';
import { HandGunService } from './hand-gun.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HandGun } from '../../database/entity/hand-gun.entity';

describe('HandGunService', () => {
  let service: HandGunService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HandGunService,
        {
          provide: getRepositoryToken(HandGun),
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

    service = module.get<HandGunService>(HandGunService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
