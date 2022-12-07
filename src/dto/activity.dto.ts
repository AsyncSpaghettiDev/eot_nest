export class CreateActivityDto {
    people: number
    tableId: number
    statusId: number
}

export class UpdateActivityDto {
    statusId?: number
}