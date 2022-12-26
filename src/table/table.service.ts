import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Table } from 'entities'
import { CreateTableDto, UpdateTableDto } from 'dto'


@Injectable()
export class TableService {
    constructor(
        @InjectRepository(Table) private tableRepository: Repository<Table>,
    ) { }

    getTables() {
        return this.tableRepository.find({
            relations: ['activities', 'activities.status'],
            order: {
                sortId: 'ASC',
            }
        })
    }

    getTable(id: number) {
        return this.tableRepository.findOne({
            where: {
                id
            },
            relations: ['activities', 'activities.status']
        })
    }

    getHistoryTables() {
        return this.tableRepository.find({
            relations: ['activities', 'activities.status'],
            withDeleted: true,
            order: {
                sortId: 'ASC',
            }
        })
    }

    getHistoryTable(id: number) {
        return this.tableRepository.findOne({
            where: {
                id
            },
            relations: ['activities'],
            withDeleted: true
        })
    }

    async createTable(table: CreateTableDto) {
        const { name, capacity, } = table
        // validate if table already exists
        await this.tableDuplicated(name)

        const newTable = this.tableRepository.create({
            name,
            capacity,
        })
        return this.tableRepository.save(newTable)
    }

    async updateTable(id: number, table: UpdateTableDto) {
        const { name, capacity } = table
        const tableExists = await this.tableExists(id)

        if (tableExists.activities.length > 0) throw new HttpException('Table has active activities', HttpStatus.CONFLICT)

        const updatedTable = await this.tableRepository.update(id, {
            name,
            capacity,
        })
        return {
            ...updatedTable,
            capacity,
        }
    }

    async deleteTable(id: number) {
        const table = await this.tableExists(id)

        if (table.activities.length > 0) throw new HttpException('Table has activities', HttpStatus.CONFLICT)

        const deletedTable = await this.tableRepository.softDelete(id)
        return deletedTable
    }

    async tableExists(id: number) {
        const table = await this.tableRepository.findOne({
            where: {
                id
            },
            relations: ['activities']
        })
        if (!table) throw new HttpException('Table not found', HttpStatus.NOT_FOUND)
        return table
    }

    async tableDuplicated(name: string) {
        const table = await this.tableRepository.findOne({
            where: {
                name
            }
        })
        if (table) throw new HttpException('Table already exists', HttpStatus.CONFLICT)
        return table
    }
}
