import { Module } from '@nestjs/common'
import { OrderService } from './order.service'
import { OrderController } from './order.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Order } from 'entities'
import { StatusModule } from 'status/status.module'
import { PlateModule } from 'plate/plate.module'

@Module({
  imports: [TypeOrmModule.forFeature([Order]), StatusModule, PlateModule],
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule { }
