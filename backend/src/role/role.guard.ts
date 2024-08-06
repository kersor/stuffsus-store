import { Injectable, CanActivate, ExecutionContext, ForbiddenException, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './role.decorator';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
        return true;
    }

    const request = context.switchToHttp().getRequest();
    const pretoken = request.headers.authorization

    if(!pretoken || pretoken.slice(0, 6) !== 'Bearer') throw new HttpException('У вас нет доступа', HttpStatus.FORBIDDEN)

    const token = request.headers.authorization.slice(7);
    if (!token) throw new HttpException('У вас нет доступа', HttpStatus.FORBIDDEN)

    const user = this.jwtService.verify(token)    
    const role = user.roles.filter(item => roles.includes(item.role.name))


    if (!role.length) {
        throw new HttpException('У вас нет доступа', HttpStatus.FORBIDDEN)
    }

    return true;
  }
} 