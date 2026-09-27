import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('auth')
export class AuthController {
  constructor(private prisma: PrismaService) {}

  @Post('register')
  async register(@Body() body: any) {
    const { phone, name, password } = body;
    if (!phone || !name || !password) throw new HttpException('Missing fields', HttpStatus.BAD_REQUEST);
    
    let user = await this.prisma.user.findUnique({ where: { phone } });
    if (user) throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);

    user = await this.prisma.user.create({
      data: { phone, name, password }
    });
    
    return { token: user.id, user };
  }

  @Post('login')
  async login(@Body() body: any) {
    const { phone, password } = body;
    const user = await this.prisma.user.findUnique({ where: { phone } });
    
    if (!user) {
      throw new HttpException('No account found with this number. Please sign up!', HttpStatus.NOT_FOUND);
    }
    
    if (user.password !== password) {
      throw new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED);
    }
    
    return { token: user.id, user };
  }
}
