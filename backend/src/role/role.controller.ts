import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleCreateDto } from './role.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('create')
  async createRole (@Body() dto: RoleCreateDto) {
    return this.roleService.createRole(dto)
  }

  @Get()
  async foundRolesAll () {
    return this.roleService.foundRolesAll()
  }

  @Get(':id')
  async foundRole (@Param('id') id: string) {
    return this.roleService.foundRoleId(id)
  }
}
