import { Test, TestingModule } from '@nestjs/testing';
import { PercussionTypeController } from './percussion-type.controller';

describe('PercussionTypeController', () => {
  let controller: PercussionTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PercussionTypeController],
    }).compile();

    controller = module.get<PercussionTypeController>(PercussionTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
