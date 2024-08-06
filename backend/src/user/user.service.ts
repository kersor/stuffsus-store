import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserAddRoleDto } from './user.dto';
import { Roles } from 'src/role/role.decorator';

@Injectable()
export class UserService { 
    constructor(private prisma: PrismaService) {}

    @Roles('ADMIN')
    async foundAll () {
        const users = await this.prisma.user.findMany({
            include: {
                roles: {
                    include: {
                        role: true
                    }
                }
            }
        })

        return users
    }

    @Roles('ADMIN')
    async addRoleUser (dto: UserAddRoleDto) {

        const user = await this.prisma.user.findFirst({
            where: {id: dto.id},
            include: {roles: {include: {role: true}}} 
        })

        const foundRoleInUser = user.roles.find(item => +item.roleId === +dto.roleId)
        if(foundRoleInUser) throw new HttpException('Такая роль уже существует', HttpStatus.BAD_REQUEST)

        const addRoleForUser = await this.prisma.user.update({
            where: {id: dto.id},
            data: {
                roles: {
                    create: {
                        role: {
                            connect: {id: +dto.roleId}
                        }
                    }
                }
            },
            include: {
                roles: {
                    include: {
                        role: true
                    }
                }
            }
        })
        return addRoleForUser
    }

    @Roles('ADMIN')
    async removeRoleUser (dto: UserAddRoleDto) {
        const checkRoleUser = await this.prisma.role.findFirst({where:{id: dto.roleId}})
        if(checkRoleUser.name === 'USER') throw new HttpException('Роль USER удалять НЕЛЬЗЯ', HttpStatus.BAD_REQUEST)
        const removeRoleForUser = await this.prisma.user.update({
            where: {id: dto.id},
            data: {
                roles: {
                    deleteMany: {
                        userId: +dto.id,
                        roleId: +dto.roleId
                    }
                }
            },
            include: {
                roles: {
                    include: {
                        role: true
                    }
                }
            }
        })

        return removeRoleForUser
    }

    @Roles('ADMIN')
    async foundUser (email: string) {
        return this.prisma.user.findMany({
            where:{email: email},
            include: {
                roles: {
                    include: {role: true}
                }
            }
        })
    }
}
 