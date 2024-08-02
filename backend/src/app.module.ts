import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UserModule,
    RoleModule
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
