import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../User/UserDto/userDTO';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
   create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }


  @Get()
  @Roles('admin')
  @UseGuards(RolesGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':email')
  @Roles('admin', 'user')  
  @UseGuards(RolesGuard)
  findById(@Param('email') email: string) {
    return this.userService.findOne(email);
  }

}
