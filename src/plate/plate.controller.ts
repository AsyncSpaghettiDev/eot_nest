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
import { StaffGuard, AdminGuard } from 'auth/utils/LocalGuard'
import { PlateService } from './plate.service'
import {
    CreatePlateDto, UpdatePlateDto,
} from 'dto'

@Controller('plates')
export class PlateController {
    constructor(private plateService: PlateService) { }

    @Get()
    async getPlates() {
        const db_plates = await this.plateService.getPlates()
        let plates = []
        let lastCategory: string = ''

        db_plates.forEach((plate) => {
            if (lastCategory !== plate.category.name) {
                plates.push({
                    category: plate.category.name,
                    plates: []
                })
                lastCategory = plate.category.name
            }
            plates[plates.length - 1].plates.push(plate)
        })
        return plates
    }

    @Get(':id')
    getPlate(@Param('id') id: number) {
        return this.plateService.getPlate(id)
    }

    @UseGuards(StaffGuard)
    @Post()
    createPlate(@Body() plate: CreatePlateDto) {
        return this.plateService.createPlate(plate)
    }

    @UseGuards(StaffGuard)
    @Put(':id')
    updatePlate(@Param('id') id: number, @Body() plate: UpdatePlateDto) {
        return this.plateService.updatePlate(id, plate)
    }

    @UseGuards(AdminGuard)
    @Delete(':id')
    deletePlate(@Param('id') id: number) {
        return this.plateService.deletePlate(id)
    }
}
