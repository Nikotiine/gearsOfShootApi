import { Test, TestingModule } from '@nestjs/testing';
import { MagazineController } from './magazine.controller';

describe('MagazineController', () => {
  let controller: MagazineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MagazineController],
    }).compile();

    controller = module.get<MagazineController>(MagazineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
