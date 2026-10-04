import {
  UseGuards,
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './create-store.dto';

import { AgentGuard } from '../auth/agent.guard';

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

  @Get('status')
  checkStatus(
    @Query('storeId') storeId: string,
    @Query('phone') phone: string,
  ) {
    return this.storesService.checkStatus(storeId, phone);
  }

  @Get(':storeId/dashboard')
  @UseGuards(AgentGuard)
  getDashboardData(@Param('storeId') storeId: string) {
    return this.storesService.getDashboardData(storeId);
  }

  @Patch(':storeId/accepting-orders')
  @UseGuards(AgentGuard)
  toggleAcceptingOrders(
    @Param('storeId') storeId: string,
    @Body('isAccepting') isAccepting: boolean,
  ) {
    return this.storesService.toggleAcceptingOrders(storeId, isAccepting);
  }

  @Post('setup')
  setupAgent(@Body('setupCode') setupCode: string) {
    return this.storesService.setupAgent(setupCode);
  }

  @Post('pairing-code')
  @UseGuards(AgentGuard)
  generatePairingCode(@Body('storeId') storeId: string) {
    return this.storesService.generatePairingCode(storeId);
  }
}
