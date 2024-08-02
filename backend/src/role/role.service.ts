import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RoleCreateDto } from './role.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RoleService {
    constructor(private readonly prisma: PrismaService) {}

    async createRole (dto: RoleCreateDto) {
        const foundRole = await this.foundRole(dto.name)
        if(foundRole) throw new HttpException('Такая роль уже существует', HttpStatus.BAD_REQUEST)
        
        const role = await this.prisma.role.create({data: dto})
        return role
    }

    async foundRolesAll () {
        const roles = await this.prisma.role.findMany()
        return roles
    }

    async foundRoleId (id: string) {
        const role = await this.prisma.role.findFirst({where:{id:+id}})
        if(!role) throw new HttpException('Такой роли не существует', HttpStatus.BAD_REQUEST)
        return role
    }


    async foundRole (role: string) {
        const foundRole = await this.prisma.role.findFirst({where:{name: role}})
        return foundRole
    }
}
