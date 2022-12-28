import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Category } from 'entities'
import { CreateCategoryDto, UpdateCategoryDto } from 'dto'

@Injectable()
export class CategoryService {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) { }

  async getCategories (): Promise<Category[]> {
    return await this.categoryRepository.find()
  }

  async getCategory (id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: {
        id
      }
    })
    return category
  }

  async createCategory (category: CreateCategoryDto): Promise<Category> {
    const { name } = category

    await this.categoryDuplicated(name)

    const newCategory = this.categoryRepository.create(category)
    return await this.categoryRepository.save(newCategory)
  }

  async updateCategory (id: number, category: UpdateCategoryDto) {
    const { name } = category

    await this.categoryExists(id)

    await this.categoryDuplicated(name)

    const updatedCategory = await this.categoryRepository.update(id, {
      name
    })
    return updatedCategory
  }

  async deleteCategory (id: number) {
    await this.categoryExists(id)

    const deletedCategory = await this.categoryRepository.softDelete(id)
    return deletedCategory
  }

  async categoryExists (id: number) {
    const category = await this.categoryRepository.findOne({
      where: {
        id
      }
    })
    if (!category) {
      throw new HttpException('Category does not exists', HttpStatus.NOT_FOUND)
    }
  }

  async categoryDuplicated (name: string) {
    const category = await this.categoryRepository.findOne({
      where: {
        name
      }
    })
    if (category) {
      throw new HttpException('Category already exists', HttpStatus.BAD_REQUEST)
    }
  }
}
