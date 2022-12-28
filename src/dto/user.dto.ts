export class CreateUserDto {
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
