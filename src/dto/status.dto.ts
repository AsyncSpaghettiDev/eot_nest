export class CreateStatusDto {
    name: string
    sortId: number
    description: string
}

export class UpdateStatusDto {
    name?: string
    sortId?: number
    description?: string
}