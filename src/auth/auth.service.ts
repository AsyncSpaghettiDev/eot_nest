import { Inject, Injectable } from '@nestjs/common'
import { UsersService } from 'users/users.service'
import { comparePassword } from 'utils/bcrypt'

@Injectable()
export class AuthService {
    constructor(
        @Inject('USER_SERVICE') private readonly userService: UsersService,
    ) { }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.getUserByUsername(username)
        if (comparePassword(password, user.password)) {
            const { password, ...result } = user
            return result
        }
        return null

    }
}
