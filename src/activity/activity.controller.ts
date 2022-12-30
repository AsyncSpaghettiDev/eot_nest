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
import { AdminGuard, StaffGuard } from 'auth/utils/LocalGuard'
import { ActivityService } from './activity.service'
import {
  CreateActivityDto
} from 'dto'

@Controller('activity')
export class ActivityController {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly activityService: ActivityService
  ) { }

  @UseGuards(AdminGuard)
  @Get()
  async getActivities () {
    return await this.activityService.getActivities()
  }

  @UseGuards(StaffGuard)
  @Get('current')
  async getCurrentActivities () {
    return await this.activityService.getCurrentActivities()
  }

  @UseGuards(AdminGuard)
  @Get(':id')
  async getActivity (@Param('id') id: number) {
    return await this.activityService.getActivity(id)
  }

  // @UseGuards(AuthenticatedGuard)
  @Get('current/:id')
  async getCurrentActivity (@Param('id') id: number) {
    return await this.activityService.getCurrentActivity(id)
  }

  // @UseGuards(AuthenticatedGuard)
  @Get('table/:id')
  async getCurrentTableActivity (@Param('id') id: number) {
    return await this.activityService.getCurrentTableActivity(id)
  }

  @UseGuards(StaffGuard)
  @Post()
  async createActivity (@Body() activity: CreateActivityDto) {
    return await this.activityService.createActivity(activity)
  }

  @UseGuards(StaffGuard)
  @Put(':id')
  async updateActivity (@Param('id') id: number) {
    return await this.activityService.updateActivity(id)
  }

  @UseGuards(StaffGuard)
  @Delete(':id')
  async deleteActivity (@Param('id') id: number) {
    return await this.activityService.deleteActivity(id)
  }
}
