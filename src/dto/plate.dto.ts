export class CreatePlateDto {
  name: string
  price: number
  description: string
  image: string
  quantity: number
  isVeg: boolean
  categoryId: number
}

export class UpdatePlateDto {
  name?: string
  price?: number
  description?: string
  image?: string
  quantity?: number
  isVeg?: boolean
  categoryId?: number
}
