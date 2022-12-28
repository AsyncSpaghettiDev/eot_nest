export class CreateOrderDto {
  quantity: number
  subtotal: number
  activityId: number
  plateId: number
  statusId: number
}

export class UpdateOrderDto {
  statusId?: number
}
