import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProductBrandCreateDto } from './product-brand.dto';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
const fs = require('fs-extra')

@Injectable()
export class ProductBrandService {
    constructor(private readonly prisma: PrismaService) {}

    async createProductBrand (file: Express.Multer.File, dto: ProductBrandCreateDto) {
        const pathPublic = path.resolve(path.join(__dirname, '..', 'public'))

        const checkName = await this.checkNameBrand(dto.name)
        if(checkName) throw new HttpException('Такой бренд уже существует', HttpStatus.BAD_REQUEST)

        fs.ensureDir(pathPublic, err => err)
        const namePhoto = uuidv4() + '.png'
        file.filename = namePhoto
        const pathPhoto = pathPublic + '/' + namePhoto

        fs.writeFile(pathPhoto, file.buffer)

        const createProductBrand = await this.prisma.productBrand.create({
            data: {
                name: dto.name,
                photo: namePhoto
            }
        })

        return createProductBrand
    }

    async foundAllProductBrand () {
        const foundAllProductBrand = await this.prisma.productBrand.findMany()
        return foundAllProductBrand
    }

    async foundOneProductBrand (id: string) {
        const foundOneProductBrand = await this.prisma.productBrand.findFirst({where: {id: +id}})
        return foundOneProductBrand
    }

    async deleteOneProductBrand (id: string) {
        const deleteOneProductBrand = await this.prisma.productBrand.delete({where: {id: +id}})
        return deleteOneProductBrand
    }


    async checkNameBrand (name: string) {
        const checkName = await this.prisma.productBrand.findFirst({where:{name:name}})
        return checkName
    }
}
