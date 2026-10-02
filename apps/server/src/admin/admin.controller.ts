import {
  Controller,
  Get,
  Param,
  Patch,
  Headers,
  UnauthorizedException,
  Body,
} from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  private checkAuth(password: string) {
    if (process.env.ADMIN_PASSWORD && password !== process.env.ADMIN_PASSWORD) {
      throw new UnauthorizedException('Invalid admin password');
    }
  }

  @Get('stats')
  getPlatformStats(@Headers('x-admin-password') password: string) {
    this.checkAuth(password);
    return this.adminService.getPlatformStats();
  }

  @Patch('stores/:id/approve')
  approveStore(
    @Param('id') id: string,
    @Headers('x-admin-password') password: string,
  ) {
    this.checkAuth(password);
    return this.adminService.approveStore(id);
  }

  @Patch('stores/:id/revoke')
  revokeStore(
    @Param('id') id: string,
    @Headers('x-admin-password') password: string,
    @Body() body: { reason: string },
  ) {
    this.checkAuth(password);
    return this.adminService.revokeStore(id, body.reason);
  }

  @Patch('stores/:id/decline')
  declineStore(
    @Param('id') id: string,
    @Headers('x-admin-password') password: string,
    @Body() body: { reason: string },
  ) {
    this.checkAuth(password);
    return this.adminService.declineStore(id, body.reason);
  }
}
