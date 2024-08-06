import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleCreateDto } from './role.dto';
import { RolesGuard } from './role.guard';
import { Roles } from './role.decorator';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Roles('ADMIN')
  @Post('/create')
  async createRole (@Body() dto: RoleCreateDto) {
    return this.roleService.createRole(dto)
  }

  @Roles('ADMIN')
  @Get('/all')
  async foundRolesAll () {
    return this.roleService.foundRolesAll()
  }

  @Roles('ADMIN')
  @Get(':id')
  async foundRole (@Param('id') id: string) {
    return this.roleService.foundRoleId(id)
  }
}
