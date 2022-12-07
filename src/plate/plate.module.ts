import { Module } from '@nestjs/common'
import { PlateService } from './plate.service'
import { PlateController } from './plate.controller'
import { Plate } from 'entities'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CategoryModule } from 'category/category.module'

@Module({
  imports: [TypeOrmModule.forFeature([Plate]), CategoryModule],
  providers: [PlateService],
  controllers: [PlateController]
})
export class PlateModule { }
