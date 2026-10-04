import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AgentGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['x-agent-token'];

    if (!token) {
      throw new UnauthorizedException('Missing X-Agent-Token header');
    }

    const deviceToken = await this.prisma.deviceToken.findUnique({
      where: { token },
      include: { store: true }
    });

    if (!deviceToken) {
      throw new UnauthorizedException('Invalid or revoked token');
    }

    // Attach store to request for convenience
    request.store = deviceToken.store;
    request.deviceToken = deviceToken;

    // Update lastUsedAt asynchronously
    this.prisma.deviceToken.update({
      where: { id: deviceToken.id },
      data: { lastUsedAt: new Date() }
    }).catch(() => {});

    return true;
  }
}
