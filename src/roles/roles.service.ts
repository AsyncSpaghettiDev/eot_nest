import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Not, Repository } from 'typeorm'
import { Role } from 'entities'
import { CreateRoleDto, UpdateRoleDto } from 'dto'

@Injectable()
export class RolesService {
  // eslint-disable-next-line no-useless-constructor
  constructor (@InjectRepository(Role) private roleRepository: Repository<Role>) { }
  async getRoles () {
    return this.roleRepository.find({
      order: {
        sortId: 'ASC'
      }
    })
  }

  async getEmployeesRoles () {
    return this.roleRepository.find({
      order: {
        sortId: 'ASC'
      },
      where: {
        name: Not('table')
      }
    })
  }

  async getRole (id: number) {
    const role = await this.roleRepository.findOne({
      where: { id }
    })
    if (!role) { throw new HttpException('Role not found', HttpStatus.NOT_FOUND) }
    return role
  }

  async createRole (role: CreateRoleDto) {
    // validate if role already exists
    const roleDuplicated = await this.roleRepository.findOne({
      where: {
        name: role.name
      }
    })
    if (roleDuplicated) throw new HttpException('Role already exists', HttpStatus.CONFLICT)

    const newRole = this.roleRepository.create(role)
    return this.roleRepository.save(newRole)
  }

  async updateRole (id: number, role: UpdateRoleDto) {
    const roleExists = await this.roleRepository.findOne({
      where: { id }
    })
    if (!roleExists) { throw new HttpException('Role not found', HttpStatus.NOT_FOUND) }
    return this.roleRepository.update(id, role)
  }

  async deleteRole (id: number) {
    const roleExists = await this.roleRepository.findOne({
      where: { id }
    })
    if (!roleExists) { throw new HttpException('Role not found', HttpStatus.NOT_FOUND) }
    return this.roleRepository.delete(id)
  }
}
