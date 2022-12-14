import { Controller, Post, Body, Get, Param, ParseIntPipe, Put, Delete, UseGuards } from '@nestjs/common'
import { AdminGuard } from 'auth/utils/LocalGuard'
import { CreateUserDto, UpdateUserDto } from 'dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  // eslint-disable-next-line no-useless-constructor
  constructor (private usersService: UsersService) { }

  @UseGuards(AdminGuard)
  @Get()
  getUsers () {
    return this.usersService.getUsers()
  }

  @UseGuards(AdminGuard)
  @Get('employees')
  getEmployees () {
    return this.usersService.getEmployees()
  }

  @UseGuards(AdminGuard)
  @Get(':id')
  getUser (@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUser(id)
  }

  @UseGuards(AdminGuard)
  @Post()
  createUser (@Body() user: CreateUserDto) {
    return this.usersService.createUser(user)
  }

  @UseGuards(AdminGuard)
  @Put(':id')
  updateUser (@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto) {
    return this.usersService.updateUser(id, user)
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  deleteUser (@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id)
  }
}
