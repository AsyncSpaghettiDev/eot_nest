import {
    Controller,
    UseGuards,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
} from '@nestjs/common'
import { AuthenticatedGuard, StaffGuard, AdminGuard } from 'auth/utils/LocalGuard'
import { OrderStatusService, ActivityStatusService } from './status.service'
import {
    CreateStatusDto, UpdateStatusDto,
} from 'dto'

@Controller('status/order')
export class OrderStatusController {
    constructor(
        private orderStatusService: OrderStatusService,
    ) { }

    @UseGuards(AuthenticatedGuard)
    @Get()
    getOrderStatuses() {
        return this.orderStatusService.getOrderStatuses()
    }

    @UseGuards(AuthenticatedGuard)
    @Get(':id')
    getOrderStatus(@Param('id') id: number) {
        return this.orderStatusService.getOrderStatus(id)
    }

    @UseGuards(StaffGuard)
    @Post()
    createOrderStatus(@Body() orderStatus: CreateStatusDto) {
        return this.orderStatusService.createOrderStatus(orderStatus)
    }

    @UseGuards(StaffGuard)
    @Put(':id')
    updateOrderStatus(@Param('id') id: number, @Body() orderStatus: UpdateStatusDto) {
        return this.orderStatusService.updateOrderStatus(id, orderStatus)
    }

    @UseGuards(AdminGuard)
    @Delete(':id')
    deleteOrderStatus(@Param('id') id: number) {
        return this.orderStatusService.deleteOrderStatus(id)
    }
}

@Controller('status/activity')
export class ActivityStatusController {
    constructor(
        private activityStatusService: ActivityStatusService,
    ) { }

    @UseGuards(AuthenticatedGuard)
    @Get()
    getActivityStatuses() {
        return this.activityStatusService.getActivityStatuses()
    }

    @UseGuards(AuthenticatedGuard)
    @Get(':id')
    getActivityStatus(@Param('id') id: number) {
        return this.activityStatusService.getActivityStatus(id)
    }

    @UseGuards(StaffGuard)
    @Post()
    createActivityStatus(@Body() activityStatus: CreateStatusDto) {
        return this.activityStatusService.createActivityStatus(activityStatus)
    }

    @UseGuards(StaffGuard)
    @Put(':id')
    updateActivityStatus(@Param('id') id: number, @Body() activityStatus: UpdateStatusDto) {
        return this.activityStatusService.updateActivityStatus(id, activityStatus)
    }

    @UseGuards(AdminGuard)
    @Delete(':id')
    deleteActivityStatus(@Param('id') id: number) {
        return this.activityStatusService.deleteActivityStatus(id)
    }
}