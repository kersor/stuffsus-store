import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService { 
    constructor(private prisma: PrismaService) {}

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
 