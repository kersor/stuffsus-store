import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { RolesGuard } from './role/role.guard';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    AuthModule,
    UserModule,
    RoleModule,
  ],
  controllers: [],
  providers: [
    PrismaService,
      {
        provide: APP_GUARD,
        useClass: RolesGuard,
      },
  ],
})
export class AppModule {}
