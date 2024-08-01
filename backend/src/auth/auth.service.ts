import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthCreateDto, AuthLoginDto } from './auth.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService, 
        private userService: UserService, 
        private jwtService: JwtService
    ) {}

    async register (dto: AuthCreateDto) {
        const candidate = await this.userService.foundUser(dto.email)
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
                            connect: { id: role.id } 
                        }
                    }
                }
            }
        })

        return user
    }

    async login (dto: AuthLoginDto) {
        const candidate = await this.userService.foundUser(dto.email)
        if(!candidate) throw new HttpException('Пароль либо Email не верны', HttpStatus.BAD_REQUEST)

        const password = await bcrypt.compare(dto.password, candidate[0].password)
        if(!password) throw new HttpException('Пароль либо Email не верны', HttpStatus.BAD_REQUEST)

        const token = await this.generateToken(candidate[0])
        return token
    }

    async foundRole (role: string) {
        const foundRole = await this.prisma.role.findFirst({where: {name: role}})
        return foundRole
    }

    async generateToken (payload: any) {
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}
