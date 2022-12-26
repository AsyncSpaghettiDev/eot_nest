import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { SessionEntity } from 'entities'
import { Repository } from 'typeorm'
import { UsersService } from 'users/users.service'
import { comparePassword } from 'utils/bcrypt'

@Injectable()
export class AuthService {
    constructor(
        @Inject('USER_SERVICE') private readonly userService: UsersService,
        @InjectRepository(SessionEntity) private readonly sessionRepository: Repository<SessionEntity>,
    ) { }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.getUserByUsername(username)
        if (comparePassword(password, user.password)) {
            const { password, ...result } = user
            return result
        }
        return null
    }

    async deleteSession(session_id: string) {
        const session = await this.sessionRepository.findOne({ where: { id: session_id } })
        await this.sessionRepository.softRemove(session)
    }

}
