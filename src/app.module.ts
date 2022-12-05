import { Module } from '@nestjs/common'

import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'

import { UsersModule } from './users/users.module'
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport'
import { entities } from 'entities'

@Module({
    imports: [
        ConfigModule.forRoot(),
        PassportModule.register({
            session: true,
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
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
    ],
})
export class AppModule { }
