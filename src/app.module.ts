import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { Module } from '@nestjs/common'

import { UsersModule } from './users/users.module'
import { RolesModule } from './roles/roles.module'
import { AuthModule } from './auth/auth.module'
import { CategoryModule } from './category/category.module'
import { ActivityModule } from './activity/activity.module'
import { OrderModule } from './order/order.module'
import { PlateModule } from './plate/plate.module'
import { StatusModule } from './status/status.module'
import { TableModule } from './table/table.module'
import { entities } from 'entities'

ConfigModule.forRoot()
import { AdminPanelModule } from 'admin.panel'

@Module({
    imports: [
        PassportModule.register({
            session: true,
        }),
        AdminPanelModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: process.env.DATABASE_URL,
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            entities,
            synchronize: true,
        }),
        RolesModule,
        UsersModule,
        AuthModule,
        CategoryModule,
        ActivityModule,
        OrderModule,
        PlateModule,
        StatusModule,
        TableModule,
    ],
})
export class AppModule { }