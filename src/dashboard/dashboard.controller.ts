import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { NewItemsService } from './new-items/new-items.service';
import { NewItemsDto } from '../dto/new-items.dto';

@Controller('dashboard')
@ApiTags('Dashboard')
export class DashboardController {
  constructor(private readonly newItemService: NewItemsService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all nouveaux article',
    description: 'Retourne la liste des nouveaux objets mis en vente',
  })
  @ApiOkResponse({
    type: [NewItemsDto],
  })
  public async getAllNewArticles(): Promise<NewItemsDto[]> {
    return this.newItemService.findNewItems();
  }
}
