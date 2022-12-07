import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
    ParseIntPipe,
    UseGuards,
} from '@nestjs/common'
import { AdminGuard, AuthenticatedGuard, StaffGuard } from 'auth/utils/LocalGuard'
import { TableService } from './table.service'
import { CreateTableDto, UpdateTableDto } from 'dto'

@Controller('tables')
export class TableController {
    constructor(private tableService: TableService) { }

    @UseGuards(AuthenticatedGuard)
    @Get()
    getTables() {
        return this.tableService.getTables()
    }

    @UseGuards(AdminGuard)
    @Get('history')
    getHistoryTables() {
        return this.tableService.getHistoryTables()
    }

    @UseGuards(AuthenticatedGuard)
    @Get(':id')
    getTable(@Param('id', ParseIntPipe) id: number) {
        return this.tableService.getTable(id)
    }

    @UseGuards(AdminGuard)
    @Get('history/:id')
    getHistoryTable(@Param('id', ParseIntPipe) id: number) {
        return this.tableService.getHistoryTable(id)
    }

    @UseGuards(StaffGuard)
    @Post()
    createTable(@Body() table: CreateTableDto) {
        return this.tableService.createTable(table)
    }

    @UseGuards(StaffGuard)
    @Put(':id')
    updateTable(@Param('id', ParseIntPipe) id: number, @Body() table: UpdateTableDto) {
        return this.tableService.updateTable(id, table)
    }

    @UseGuards(AdminGuard)
    @Delete(':id')
    deleteTable(@Param('id', ParseIntPipe) id: number) {
        return this.tableService.deleteTable(id)
    }
}
