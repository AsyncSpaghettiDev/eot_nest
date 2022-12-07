import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Order } from 'entities'
import { OrderStatusService } from 'status/status.service'
import {
    CreateOrderDto, UpdateOrderDto,
} from 'dto'

@Injectable()
export class OrderService {
    constructor(
        private readonly orderStatusService: OrderStatusService,
        @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    ) { }

    async getOrders(): Promise<Order[]> {
        return await this.orderRepository.find({
            relations: ['activity', 'plate', 'status'],
            order: {
                status: {
                    sortId: 'ASC'
                }
            }
        })
    }

    async getOrder(id: number): Promise<Order> {
        return await this.orderExists(id)
    }

    async createOrder(order: CreateOrderDto): Promise<Order> {
        const newOrder = this.orderRepository.create(order)
        return await this.orderRepository.save(newOrder)
    }

    async updateOrder(id: number, order: UpdateOrderDto) {
        await this.orderExists(id)

        return await this.orderRepository.update(id, order)
    }

    async requestCancelOrder(id: number) {
        const order_tocancel = await this.orderExists(id)
        if (order_tocancel.status.name !== 'ordered')
            throw new HttpException('Order can not be canceled', HttpStatus.NOT_ACCEPTABLE)

        const cancelStatus = await this.orderStatusService.getOrderStatusId('cancel_request') | 5
        return await this.orderRepository.update(id, { statusId: cancelStatus })
    }

    async cancelOrder(id: number) {
        await this.orderExists(id)

        const cancelStatus = await this.orderStatusService.getOrderStatusId('cancel') | 6
        await this.orderRepository.update(id, { statusId: cancelStatus })
        return this.orderRepository.softDelete(id)
    }

    async deleteOrder(id: number) {
        await this.orderExists(id)

        return await this.orderRepository.softDelete(id)
    }

    async orderDuplicated(order: CreateOrderDto) {
        const orderFound = await this.orderRepository.findOne({
            where: { plateId: order.plateId, statusId: order.statusId },
        })

        if (orderFound)
            throw new HttpException('Order status already exists', HttpStatus.BAD_REQUEST)
    }
    async orderExists(id: number): Promise<Order> {
        const orderFound = await this.orderRepository.findOne({
            where: { id },
            relations: ['plate', 'status'],
        })

        if (!orderFound) {
            throw new HttpException('Order not found', HttpStatus.NOT_FOUND)
        }

        return orderFound
    }
}
