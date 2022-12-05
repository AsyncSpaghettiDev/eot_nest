import { Inject } from "@nestjs/common"
import { PassportSerializer } from "@nestjs/passport"
import { User } from "entities"
import { UsersService } from "users/users.service"

export class SessionSerializer extends PassportSerializer {
    constructor(
        @Inject('USER_SERVICE') private readonly userService: UsersService,
    ) {
        super()
    }

    async serializeUser(user: any, done: (err: Error, user: any) => void): Promise<any> {
        console.log('serializeUser', user)
        done(null, user)
    }

    async deserializeUser(user: User, done: (err: Error, user: User) => void): Promise<any> {
        console.log('deserializeUser', user)
        const userDB = await this.userService.getUser(user.id)
        done(null, userDB)
    }
}