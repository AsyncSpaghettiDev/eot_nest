import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Order, OrderStatus } from 'entities'
import { OrderStatusService } from 'status/status.service'
import {
  CreateOrderDto, UpdateOrderDto
} from 'dto'
import { PlateService } from 'plate/plate.service'

@Injectable()
export class OrderService {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly plateService: PlateService,
    private readonly orderStatusService: OrderStatusService,
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>
  ) { }

  async getOrders (): Promise<Order[]> {
    return await this.orderRepository.find({
      relations: ['activity', 'plate', 'status'],
      order: {
        status: {
          sortId: 'ASC'
        }
      }
    })
  }

  async getOrder (id: number): Promise<Order> {
    return await this.orderExists(id)
  }

  async getOrderStatus (id: number): Promise<OrderStatus> {
    const { status } = await this.orderExists(id)
    return status
  }

  async createOrder (order: CreateOrderDto) {
    const orderStatus = await this.orderStatusService.getOrderStatusId('ordered') | 1
    const newOrder = this.orderRepository.create({
      ...order,
      statusId: orderStatus
    })
    const newOrderCreated = await this.orderRepository.save(newOrder)
    const plate = await this.plateService.getPlate(order.plateId)
    return {
      ...newOrderCreated,
      plate
    }
  }

  async updateOrder (id: number, order: UpdateOrderDto) {
    await this.orderExists(id)

    return await this.orderRepository.update(id, order)
  }

  async requestCancelOrder (id: number) {
    const orderTocancel = await this.orderExists(id)
    if (orderTocancel.status.name !== 'ordered') { throw new HttpException('Order can not be canceled', HttpStatus.NOT_ACCEPTABLE) }

    const cancelStatus = await this.orderStatusService.getOrderStatusId('cancel_request') | 5
    return await this.orderRepository.update(id, { statusId: cancelStatus })
  }

  async cancelOrder (id: number) {
    await this.orderExists(id)

    const cancelStatus = await this.orderStatusService.getOrderStatusId('cancel') | 6
    await this.orderRepository.update(id, { statusId: cancelStatus })
    return this.orderRepository.softDelete(id)
  }

  async deleteOrder (id: number) {
    await this.orderExists(id)

    return await this.orderRepository.softDelete(id)
  }

  async orderDuplicated (order: CreateOrderDto) {
    const orderFound = await this.orderRepository.findOne({
      where: { plateId: order.plateId, statusId: order.statusId }
    })

    if (orderFound) { throw new HttpException('Order status already exists', HttpStatus.BAD_REQUEST) }
  }

  async orderExists (id: number): Promise<Order> {
    const orderFound = await this.orderRepository.findOne({
      where: { id },
      relations: ['plate', 'status']
    })

    if (!orderFound) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND)
    }

    return orderFound
  }
}
