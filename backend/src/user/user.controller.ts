import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserAddRoleDto } from './user.dto';
import { Roles } from 'src/role/role.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles('ADMIN')
  @Get('/all')
  async foundAll () {
    return this.userService.foundAll()
  }

  @Roles('ADMIN')
  @Post('/add-role')
  async addRoleUser (@Body() dto: UserAddRoleDto) {
    return this.userService.addRoleUser(dto)
  }

  @Roles('ADMIN')
  @Post('/remove-role')
  async removeRoleUser (@Body() dto: UserAddRoleDto) {
    return this.userService.removeRoleUser(dto)
  }

}
