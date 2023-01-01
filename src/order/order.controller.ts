import {
  Controller,
  UseGuards,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete
} from '@nestjs/common'
import { AdminGuard, AuthenticatedGuard, StaffGuard } from 'auth/utils/LocalGuard'
import { OrderService } from './order.service'
import {
  CreateOrderDto, UpdateOrderDto
} from 'dto'

@Controller('orders')
export class OrderController {
  // eslint-disable-next-line no-useless-constructor
  constructor (private readonly orderService: OrderService) { }

  @UseGuards(StaffGuard)
  @Get()
  async getOrders () {
    const dbOrders = await this.orderService.getOrders()

    const orders = {
      ordered: [],
      cooking: [],
      ready: [],
      served: [],
      cancel_request: [],
      cancel: []
    }

    dbOrders.forEach((order) => {
      orders[order.status.name].push(order)
    })

    return orders
  }

  @UseGuards(AuthenticatedGuard)
  @Get(':id')
  async getOrder (@Param('id') id: number) {
    return await this.orderService.getOrder(id)
  }

  @UseGuards(AuthenticatedGuard)
  @Get(':id/status')
  async getOrderStatus (@Param('id') id: number) {
    return await this.orderService.getOrderStatus(id)
  }

  @UseGuards(AuthenticatedGuard)
  @Post()
  async createOrder (@Body() order: CreateOrderDto) {
    return await this.orderService.createOrder(order)
  }

  @UseGuards(AuthenticatedGuard)
  @Post('cancel/:id')
  async requestCancelOrder (@Param('id') id: number) {
    return await this.orderService.requestCancelOrder(id)
  }

  @UseGuards(StaffGuard)
  @Put(':id')
  async updateOrder (@Param('id') id: number, @Body() order: UpdateOrderDto) {
    return await this.orderService.updateOrder(id, order)
  }

  @UseGuards(StaffGuard)
  @Put('cancel/:id')
  async cancelOrder (@Param('id') id: number) {
    return await this.orderService.cancelOrder(id)
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async deleteOrder (@Param('id') id: number) {
    return await this.orderService.deleteOrder(id)
  }
}
