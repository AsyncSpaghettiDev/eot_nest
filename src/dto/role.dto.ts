export class CreateRoleDto {
  name: string
  sortId: number
  description: string
  isStaff: boolean
}

export class UpdateRoleDto {
  name?: string
  sortId?: number
  description?: string
  isStaff?: boolean
}
