import { Controller, Get, Post, Session, UseGuards, Query, HttpException, HttpStatus } from '@nestjs/common'
import { hashPassword } from 'utils/bcrypt'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './utils/LocalGuard'

@Controller('auth')
export class AuthController {
  // eslint-disable-next-line no-useless-constructor
  constructor (private authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login (@Session() session: Record<string, any>) {
    session.authenticated = true
    return session
  }

  @Get('encrypt')
  async encrypt (@Query('password') password: string) {
    if (!password) throw new HttpException('Password is required', HttpStatus.BAD_REQUEST)
    return hashPassword(password)
  }

  @Get()
  async getCurrentSession (@Session() session: Record<string, any>) {
    return session
  }

  @Post('logout')
  async logout (
    @Session() session: Record<string, any>
  ) {
    session.authenticated = false
    // not working
    // this.authService.deleteSession(session.id)
    session.destroy()
    return session
  }
}
