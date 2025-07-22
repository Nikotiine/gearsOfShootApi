import { Test, TestingModule } from '@nestjs/testing';
import { PercussionTypeController } from './percussion-type.controller';
import { PercussionTypeService } from './percussion-type.service';

describe('PercussionTypeController', () => {
  let controller: PercussionTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PercussionTypeController],
      providers: [
        {
          provide: PercussionTypeService,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PercussionTypeController>(PercussionTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
