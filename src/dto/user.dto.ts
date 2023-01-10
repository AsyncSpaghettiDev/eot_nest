export class CreateUserDto {
  name: string
  lastname: string
  phone: string
  username: string
  password: string
  tableId?: number
  roleId: number
}

export class UpdateUserDto {
  username?: string
  password?: string
  tableId?: number
  roleId?: number
}
