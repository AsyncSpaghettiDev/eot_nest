import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from 'entities'
import { CreateUserDto, UpdateUserDto } from 'dto'
import { RolesService } from 'roles/roles.service'
import { hashPassword } from 'utils/bcrypt'

@Injectable()
export class UsersService {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    private rolesService: RolesService,
    @InjectRepository(User) private userRepository: Repository<User>
  ) { }

  getUsers () {
    return this.userRepository.find({
      order: {
        roleId: 'ASC'
      }
    })
  }

  async getUser (id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['role'],
      select: {
        id: false,
        password: false
      }
    })
    if (!user) { throw new HttpException('User not found', HttpStatus.NOT_FOUND) }
    return user
  }

  async getUserByUsername (username: string) {
    const user = await this.userRepository.findOne({
      where: { username },
      relations: ['role']
    })
    if (!user) { throw new HttpException('User not found', HttpStatus.NOT_FOUND) }
    return user
  }

  async createUser (user: CreateUserDto) {
    const { username, password: rawPassword, roleId } = user
    // validate if user already exists
    const userDuplicated = await this.userRepository.findOne({
      where: {
        username
      }
    })
    if (userDuplicated) throw new HttpException('User already exists', HttpStatus.CONFLICT)

    if (roleId === undefined) { throw new HttpException('Role is required', HttpStatus.BAD_REQUEST) }

    const roleFound = await this.rolesService.getRole(roleId)

    if (!roleFound) throw new HttpException('Role not found', HttpStatus.NOT_FOUND)

    // encrypt password
    const password = hashPassword(rawPassword)
    const newUser = this.userRepository.create(user)
    return this.userRepository.save({ ...newUser, password })
  }

  async updateUser (id: number, user: UpdateUserDto) {
    const userExists = await this.userRepository.findOne({
      where: { id }
    })
    if (!userExists) { throw new HttpException('User not found', HttpStatus.NOT_FOUND) }
    return this.userRepository.update(id, user)
  }

  async deleteUser (id: number) {
    const userExists = await this.userRepository.findOne({
      where: { id }
    })
    if (!userExists) { throw new HttpException('User not found', HttpStatus.NOT_FOUND) }
    return this.userRepository.delete(id)
  }
}
