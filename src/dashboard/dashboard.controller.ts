import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { NewItemsService } from './new-items/new-items.service';
import { DiscountedItemDto, NewItemsDto } from '../dto/new-items.dto';
import { DiscountItemsService } from './discount-items/discount-items.service';

@Controller('dashboard')
@ApiTags('Dashboard')
export class DashboardController {
  constructor(
    private readonly newItemService: NewItemsService,
    private readonly discountService: DiscountItemsService,
  ) {}

  @Get('new')
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

  @Get('discount')
  @ApiOperation({
    summary: 'Get all discounts',
    description: 'Retourne la liste des discounts mis en vente',
  })
  @ApiOkResponse({
    type: [DiscountedItemDto],
  })
  public async getAllDiscountedItems(): Promise<DiscountedItemDto[]> {
    return this.discountService.findDiscountedItems();
  }
}
