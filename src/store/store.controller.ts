import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StoreService } from './store.service';

@Controller('store')
@ApiTags('Store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}
}
