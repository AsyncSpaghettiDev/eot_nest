import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { SessionEntity } from 'entities'
import { Repository } from 'typeorm'
import { UsersService } from 'users/users.service'
import { comparePassword } from 'utils/bcrypt'

@Injectable()
export class AuthService {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    @Inject('USER_SERVICE') private readonly userService: UsersService,
    @InjectRepository(SessionEntity) private readonly sessionRepository: Repository<SessionEntity>
  ) { }

  async validateUser (username: string, password: string): Promise<any> {
    const user = await this.userService.getUserByUsername(username)
    if (comparePassword(password, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user
      return result
    }
    return null
  }

  async deleteSession (sessionid: string) {
    if (!sessionid) return
    const session = await this.sessionRepository.findOne({ where: { id: sessionid } })
    await this.sessionRepository.softRemove(session)
  }
}
