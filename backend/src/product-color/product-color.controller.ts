import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProductColorService } from './product-color.service';
import { CreateProductColorDto } from './product-color.dto';
import { Roles } from 'src/role/role.decorator';

@Controller('product-color')
export class ProductColorController {
  constructor(private readonly productColorService: ProductColorService) {}

  @Roles('ADMIN')
  @Post('/create')
  async createProductColor (@Body() dto: CreateProductColorDto) {
    return this.productColorService.createProductColor(dto)
  }

  @Roles('ADMIN')
  @Get()
  async foundAllProductColor () {
    return this.productColorService.foundAllProductColor()
  }

  @Roles('ADMIN')
  @Get(':id')
  async foundProductColor (@Param('id') id: string) {
    return this.productColorService.foundProductColor(id)
  }

  @Roles('ADMIN')
  @Delete(':id')
  async deleteProductColor (@Param('id') id: string) {
    return this.productColorService.deleteProductColor(id)
  }
}
