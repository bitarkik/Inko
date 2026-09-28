import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './create-store.dto';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Get()
  findAll() {
    return this.storesService.findAll();
  }

  @Post()
  create(@Body() data: CreateStoreDto) {
    return this.storesService.create(data);
  }

  @Get(':storeId/dashboard')
  getDashboardData(@Param('storeId') storeId: string) {
    return this.storesService.getDashboardData(storeId);
  }

  @Patch(':storeId/accepting-orders')
  toggleAcceptingOrders(
    @Param('storeId') storeId: string, 
    @Body('isAccepting') isAccepting: boolean
  ) {
    return this.storesService.toggleAcceptingOrders(storeId, isAccepting);
  }
}
