import { Module } from '@nestjs/common';
import { ProductColorService } from './product-color.service';
import { ProductColorController } from './product-color.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ProductColorController],
  providers: [ProductColorService, PrismaService],
})
export class ProductColorModule {}
