import { Module } from '@nestjs/common';
import { ProductBrandService } from './product-brand.service';
import { ProductBrandController } from './product-brand.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ProductBrandController],
  providers: [ProductBrandService, PrismaService],
})
export class ProductBrandModule {}
