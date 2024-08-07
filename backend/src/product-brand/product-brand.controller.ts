import { Body, Controller, Delete, FileTypeValidator, Get, Param, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductBrandService } from './product-brand.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductBrandCreateDto } from './product-brand.dto';
import { Roles } from 'src/role/role.decorator';

@Controller('product-brand')
export class ProductBrandController {
  constructor(private readonly productBrandService: ProductBrandService) {}

  @Roles('ADMIN')
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createProductBrand (
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'png' }),
        ],
      }),
    ) 
    file: Express.Multer.File, @Body() name: ProductBrandCreateDto
  ) {
    return this.productBrandService.createProductBrand(file, name)
  }

  @Get()
  async foundAllProductBrand () {
    return this.productBrandService.foundAllProductBrand()
  }

  @Get(':id')
  async foundOneProductBrand (@Param('id') id: string) {
    return this.productBrandService.foundOneProductBrand(id)
  }

  @Roles('ADMIN')
  @Delete(':id')
  async deleteOneProductBrand (@Param('id') id: string) {
    return this.productBrandService.deleteOneProductBrand(id)
  }
}
