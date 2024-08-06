import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductColorDto } from './product-color.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductColorService {
    constructor(private readonly prisma: PrismaService) {}

    
    async createProductColor (dto: CreateProductColorDto) {
        const foundColor = await this.checkProductColor(dto.name)
        if(foundColor) throw new HttpException('Такой цвет уже существует', HttpStatus.BAD_REQUEST)
     
        const create = await this.prisma.productColor.create({data: dto})
        return create
    }

    async foundAllProductColor () {
        const foundAllColor = await this.prisma.productColor.findMany()
        return foundAllColor
    }

    async foundProductColor (id: string) {
        const foundColor = await this.prisma.productColor.findFirst({where:{id:+id}})
        return foundColor
    }

    async deleteProductColor (id: string) {
        const deleteColor = await this.prisma.productColor.delete({where:{id: +id}})
        return deleteColor
    }

    async checkProductColor (name: string) {
        const check = await this.prisma.productColor.findFirst({where:{name: name}})
        return check
    }
}
