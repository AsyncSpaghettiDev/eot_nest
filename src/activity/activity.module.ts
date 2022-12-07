import { Module } from '@nestjs/common'
import { ActivityService } from './activity.service'
import { ActivityController } from './activity.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Activity } from 'entities'
import { StatusModule } from 'status/status.module'

@Module({
  imports: [TypeOrmModule.forFeature([Activity]), StatusModule],
  providers: [ActivityService],
  controllers: [ActivityController]
})
export class ActivityModule { }
