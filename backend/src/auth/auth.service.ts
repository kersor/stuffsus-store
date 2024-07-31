import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthCreateDto } from './auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}

    async register (dto: AuthCreateDto) {
        const candidate = await this.userCheck(dto.email)
        if(candidate) throw new HttpException('Пользователь с таким Email, уже существует', HttpStatus.BAD_REQUEST)
        
        let role = await this.foundRole('USER')
        if(!role) role = await this.prisma.role.create({data:{name: 'USER'}})
            
        const hash = await bcrypt.hash(dto.password, 10)
        const user = await this.prisma.user.create({
            data: {
                ...dto,
                password: hash,
                roles: {
                    create: {
                        role: {
                            connect: {id: role.id}
                        }
                    }
                }
            },
        })

        return user
    }

    async userCheck (email: string) {
        return this.prisma.user.findFirst({where:{email: email}})
    }

    async foundRole (role: string) {
        const foundRole = await this.prisma.role.findFirst({where: {name: role}})
        return foundRole
    }
}
