import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { OrderStatus, ActivityStatus } from 'entities'
import {
    CreateStatusDto, UpdateStatusDto,
} from 'dto'

@Injectable()
export class OrderStatusService {
    constructor(
        @InjectRepository(OrderStatus) private orderStatusRepository: Repository<OrderStatus>,
    ) { }

    getOrderStatuses() {
        return this.orderStatusRepository.find({
            order: {
                sortId: 'ASC',
            }
        })
    }

    async getOrderStatusId(name: string) {
        await this.orderStatusNameExists(name)
        const orderStatus = await this.orderStatusRepository.findOne({
            where: {
                name
            }
        })
        return orderStatus.id
    }

    async getOrderStatus(id: number) {
        const orderStatus = await this.orderStatusRepository.findOne({
            where: {
                id
            }
        })
        return orderStatus
    }

    async createOrderStatus(orderStatus: CreateStatusDto) {
        const { name } = orderStatus
        // validate if order status already exists
        await this.orderStatusDuplicated(name)

        const newOrderStatus = this.orderStatusRepository.create({
            name
        })
        return this.orderStatusRepository.save(newOrderStatus)
    }

    async updateOrderStatus(id: number, orderStatus: UpdateStatusDto) {
        const { name } = orderStatus
        await this.orderStatusExists(id)

        await this.orderStatusDuplicated(name)

        const updatedOrderStatus = await this.orderStatusRepository.update(id, {
            name
        })
        return updatedOrderStatus
    }

    async deleteOrderStatus(id: number) {
        await this.orderStatusExists(id)

        const deletedOrderStatus = await this.orderStatusRepository.softDelete(id)
        return deletedOrderStatus
    }

    async orderStatusExists(id: number) {
        const orderStatus = await this.orderStatusRepository.findOne({
            where: {
                id
            }
        })
        if (!orderStatus)
            throw new HttpException('Order status does not exist', HttpStatus.NOT_FOUND)

    }

    async orderStatusNameExists(name: string) {
        const orderStatus = await this.orderStatusRepository.findOne({
            where: {
                name
            }
        })
        if (!orderStatus)
            throw new HttpException('Order status does not exist', HttpStatus.NOT_FOUND)

    }

    async orderStatusDuplicated(name: string) {
        const orderStatus = await this.orderStatusRepository.findOne({
            where: {
                name
            }
        })
        if (orderStatus)
            throw new HttpException('Order status already exists', HttpStatus.CONFLICT)

    }
}

@Injectable()
export class ActivityStatusService {
    constructor(
        @InjectRepository(ActivityStatus) private activityStatusRepository: Repository<ActivityStatus>,
    ) { }

    getActivityStatuses() {
        return this.activityStatusRepository.find({
            order: {
                sortId: 'ASC',
            }
        })
    }

    async getActivityStatus(id: number) {
        const activityStatus = await this.activityStatusRepository.findOne({
            where: {
                id
            }
        })
        return activityStatus
    }

    async getActivityStatusId(name: string) {
        const activityStatus = await this.activityStatusRepository.findOne({
            where: {
                name
            }
        })
        return activityStatus.id
    }

    async createActivityStatus(activityStatus: CreateStatusDto) {
        const { name } = activityStatus
        // validate if activity status already exists
        await this.activityStatusDuplicated(name)

        const newActivityStatus = this.activityStatusRepository.create({
            name
        })
        return this.activityStatusRepository.save(newActivityStatus)
    }

    async updateActivityStatus(id: number, activityStatus: UpdateStatusDto) {
        const { name } = activityStatus
        await this.activityStatusExists(id)

        await this.activityStatusDuplicated(name)

        const updatedActivityStatus = await this.activityStatusRepository.update(id, {
            name
        })
        return updatedActivityStatus
    }

    async deleteActivityStatus(id: number) {
        await this.activityStatusExists(id)

        const deletedActivityStatus = await this.activityStatusRepository.softDelete(id)
        return deletedActivityStatus
    }

    async activityStatusExists(id: number) {
        const activityStatus = await this.activityStatusRepository.findOne({
            where: {
                id
            }
        })
        if (!activityStatus)
            throw new HttpException('Activity status does not exist', HttpStatus.NOT_FOUND)

    }

    async activityStatusDuplicated(name: string) {
        const activityStatus = await this.activityStatusRepository.findOne({
            where: {
                name
            }
        })
        if (activityStatus)
            throw new HttpException('Activity status already exists', HttpStatus.CONFLICT)

    }

    async activityStatusInUse(id: number) {
        const activityStatus = await this.activityStatusRepository.findOne({
            where: {
                id
            }
        })
        if (activityStatus.name !== 'pending')
            throw new HttpException('Activity status is in use', HttpStatus.CONFLICT)
    }
}