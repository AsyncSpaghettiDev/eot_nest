export class CreateCategoryDto {
  sortId: number
  name: string
  description: string
}

export class UpdateCategoryDto {
  sortId?: number
  name?: string
  description?: string
}
