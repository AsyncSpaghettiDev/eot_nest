import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Plate } from 'entities'
import {
  CreatePlateDto, UpdatePlateDto
} from 'dto'
import { CategoryService } from 'category/category.service'

@Injectable()
export class PlateService {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    @InjectRepository(Plate) private plateRepository: Repository<Plate>,
    private categoryService: CategoryService
  ) { }

  getPlates (): Promise<Plate[]> {
    return this.plateRepository.find({
      relations: ['category'],
      order: {
        category: {
          sortId: 'ASC'
        },
        name: 'ASC'
      }
    })
  }

  async getPlate (id: number) {
    const plate = await this.plateRepository.findOne({
      relations: ['category'],
      where: {
        id
      }
    })
    return plate
  }

  async createPlate (plate: CreatePlateDto) {
    const { name, categoryId } = plate
    // validate if plate already exists
    await this.plateDuplicated(name)

    // validate if category exists
    await this.categoryService.categoryExists(categoryId)

    const newPlate = this.plateRepository.create(plate)
    return this.plateRepository.save(newPlate)
  }

  async updatePlate (id: number, plate: UpdatePlateDto) {
    await this.plateExists(id)

    const updatedPlate = await this.plateRepository.update(id, plate)
    return updatedPlate
  }

  async deletePlate (id: number) {
    await this.plateExists(id)

    const deletedPlate = await this.plateRepository.softDelete(id)
    return deletedPlate
  }

  async plateExists (id: number) {
    const plate = await this.plateRepository.findOne({
      where: {
        id
      }
    })
    if (!plate) { throw new HttpException('Plate not found', HttpStatus.NOT_FOUND) }
  }

  async plateDuplicated (name: string) {
    const plateDuplicated = await this.plateRepository.findOne({
      where: {
        name
      }
    })
    if (plateDuplicated) { throw new HttpException('Plate already exists', HttpStatus.CONFLICT) }
  }
}
