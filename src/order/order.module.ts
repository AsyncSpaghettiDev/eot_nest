import { Module } from '@nestjs/common'
import { OrderService } from './order.service'
import { OrderController } from './order.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Order } from 'entities'
import { StatusModule } from 'status/status.module'

@Module({
  imports: [TypeOrmModule.forFeature([Order]), StatusModule],
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule { }
