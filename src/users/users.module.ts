import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

import { User, Role } from 'entities'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RolesModule } from 'roles/roles.module'

@Module({
  imports: [
    RolesModule,
    TypeOrmModule.forFeature([Role, User])
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule { }
