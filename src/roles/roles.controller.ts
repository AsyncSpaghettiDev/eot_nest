import { Controller, Post, Body, Get, Param, ParseIntPipe, Put, Delete, UseGuards } from '@nestjs/common'
import { AdminGuard } from 'auth/utils/LocalGuard'
import { CreateRoleDto, UpdateRoleDto } from 'dto'
import { RolesService } from './roles.service'

@Controller('roles')
export class RolesController {
    constructor(private rolesService: RolesService) { }

    @UseGuards(AdminGuard)
    @Get()
    getRoles() {
        return this.rolesService.getRoles()
    }

    @UseGuards(AdminGuard)
    @Get(':id')
    getRole(@Param('id', ParseIntPipe) id: number) {
        const role = this.rolesService.getRole(id)
        return role
    }

    @UseGuards(AdminGuard)
    @Post()
    createRole(@Body() role: CreateRoleDto) {
        return this.rolesService.createRole(role)
    }

    @UseGuards(AdminGuard)
    @Put(':id')
    updateRole(@Param('id', ParseIntPipe) id: number, @Body() role: UpdateRoleDto) {
        return this.rolesService.updateRole(id, role)
    }

    @UseGuards(AdminGuard)
    @Delete(':id')
    deleteRole(@Param('id', ParseIntPipe) id: number) {
        return this.rolesService.deleteRole(id)
    }

}
