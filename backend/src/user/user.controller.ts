import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserAddRoleDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/all')
  async foundAll () {
    return this.userService.foundAll()
  }

  @Post('/add-role')
  async addRoleUser (@Body() dto: UserAddRoleDto) {
    return this.userService.addRoleUser(dto)
  }

  @Post('/remove-role')
  async removeRoleUser (@Body() dto: UserAddRoleDto) {
    return this.userService.removeRoleUser(dto)
  }

}
