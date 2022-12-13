import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SessionEntity, User } from 'entities'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UsersService } from 'users/users.service'
import { SessionSerializer } from './utils/SessionSerialiazer'
import { UsersModule } from 'users/users.module'
import { RolesModule } from 'roles/roles.module'
import { LocalStrategy } from './utils/LocalStrategy'

@Module({
  imports: [
    TypeOrmModule.forFeature([User, SessionEntity]),
    UsersModule,
    RolesModule,
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService
    },
    {
      provide: 'USER_SERVICE',
      useClass: UsersService
    },
    SessionSerializer,
    LocalStrategy,
    AuthService,
  ]
})
export class AuthModule { }
