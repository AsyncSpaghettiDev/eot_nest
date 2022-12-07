export class CreateTableDto {
    name: string
    sortId: number
    capacity: number
    statusId: number
}

export class UpdateTableDto {
    name?: string
    sortId?: number
    capacity?: number
    statusId?: number
}