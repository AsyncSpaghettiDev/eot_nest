import { Module } from '@nestjs/common'
import { ActivityStatusService, OrderStatusService, } from './status.service'
import { ActivityStatusController, OrderStatusController, } from './status.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ActivityStatus, OrderStatus } from 'entities'

@Module({
  imports: [TypeOrmModule.forFeature([OrderStatus, ActivityStatus])],
  providers: [ActivityStatusService, OrderStatusService,],
  controllers: [ActivityStatusController, OrderStatusController,],
  exports: [ActivityStatusService, OrderStatusService,],
})
export class StatusModule { }
