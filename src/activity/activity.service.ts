import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Activity } from 'entities'
import {
  CreateActivityDto
} from 'dto'
import { ActivityStatusService } from 'status/status.service'

@Injectable()
export class ActivityService {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    private statusService: ActivityStatusService,
    @InjectRepository(Activity) private readonly activityRepository: Repository<Activity>
  ) { }

  async getActivities (): Promise<Activity[]> {
    return await this.activityRepository.find({
      relations: ['table', 'status', 'orders'],
      withDeleted: true
    })
  }

  async getCurrentActivities (): Promise<Activity[]> {
    return await this.activityRepository.find({
      relations: ['table', 'status', 'orders', 'orders.plate']
    })
  }

  async getActivity (id: number): Promise<Activity> {
    await this.activityExists(id)
    const activity = await this.activityRepository.findOne({
      where: {
        id
      },
      relations: ['table', 'status', 'orders'],
      withDeleted: true
    })
    return activity
  }

  async getCurrentActivity (id: number): Promise<Activity> {
    await this.activityExists(id)
    return this.activityRepository.findOne({
      where: {
        id,
        end: null
      },
      relations: ['table', 'status', 'orders', 'orders.plate']
    })
  }

  async getCurrentTableActivity (id: number): Promise<Activity> {
    const activity = await this.activityRepository.findOne({
      where: {
        tableId: id,
        end: null
      },
      relations: ['table', 'status', 'orders', 'orders.plate']
    })
    if (!activity) { throw new HttpException('Table without activity', HttpStatus.NOT_FOUND) }

    return activity
  }

  async createActivity (activity: CreateActivityDto): Promise<Activity> {
    const statusId: number = await this.statusService.getActivityStatusId('occupied')
    const newActivity = this.activityRepository.create({
      ...activity,
      statusId
    })
    return this.activityRepository.save(newActivity)
  }

  async updateActivity (id: number) {
    await this.activityExists(id)
    await this.activityWithActiveOrders(id)

    const pendingStatusId: number = await this.statusService.getActivityStatusId('pending')

    const updatedActivity = await this.activityRepository.update(id, {
      statusId: pendingStatusId
    })

    return updatedActivity
  }

  async deleteActivity (id: number): Promise<Activity> {
    const activity = await this.activityExists(id)

    await this.statusService.activityStatusInUse(activity.statusId)

    await this.activityRepository.update(id, {
      end: new Date(),
      statusId: await this.statusService.getActivityStatusId('finished')
    })
    return this.activityRepository.softRemove(activity)
  }

  async activityExists (id: number): Promise<Activity> {
    const activity = await this.activityRepository.findOne({
      where: {
        id
      },
      withDeleted: true
    })
    if (!activity) {
      throw new HttpException('Activity not found', HttpStatus.NOT_FOUND)
    }
    return activity
  }

  async activityWithActiveOrders (id: number): Promise<Activity> {
    const activity = await this.activityRepository.findOne({
      where: {
        id
      },
      relations: ['orders', 'orders.status']
    })
    console.log(activity)
    if (activity.orders.some(order => !['cancel', 'served'].includes(order.status.name))) throw new HttpException('Activity with active orders', HttpStatus.CONFLICT)
    return activity
  }
}
