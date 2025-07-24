import { Test, TestingModule } from '@nestjs/testing';
import { OpticCollarController } from './optic-collar.controller';
import { OpticCollarService } from './optic-collar.service';

describe('OpticCollarController', () => {
  let controller: OpticCollarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpticCollarController],
      providers: [
        {
          provide: OpticCollarService,
          useValue: {
            findAll: jest.fn(),
            findById: jest.fn(),
            insert: jest.fn(),
            edit: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<OpticCollarController>(OpticCollarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
