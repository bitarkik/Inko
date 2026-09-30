import { Controller, Get, Post, Body, Param, Patch, Query, Headers, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './create-store.dto';
import admin from '../firebase';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Get()
  findAll() {
    return this.storesService.findAll();
  }

  @Post()
  async create(@Body() data: CreateStoreDto, @Headers('authorization') authHeader: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid Authorization header');
    }

    const idToken = authHeader.split('Bearer ')[1];
    
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const verifiedPhone = decodedToken.phone_number;
      
      // We accept contactNumber formatted with or without the +88, but Firebase always returns with +880...
      const expectedPhone = data.contactNumber.startsWith('+88') 
        ? data.contactNumber 
        : `+88${data.contactNumber}`;

      if (verifiedPhone !== expectedPhone) {
        throw new BadRequestException(`Verified phone number (${verifiedPhone}) does not match the provided contact number.`);
      }

      return this.storesService.create(data);
    } catch (error) {
      console.error("Firebase auth error:", error);
      throw new UnauthorizedException('Invalid or expired Firebase token');
    }
  }

  @Get('status')
  checkStatus(@Query('storeId') storeId: string, @Query('phone') phone: string) {
    return this.storesService.checkStatus(storeId, phone);
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
