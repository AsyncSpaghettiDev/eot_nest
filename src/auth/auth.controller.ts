import { Controller, Get, Post, Session, UseGuards, Query, HttpException, HttpStatus } from '@nestjs/common'
import { hashPassword } from 'utils/bcrypt'
import { LocalAuthGuard } from './utils/LocalGuard'

@Controller('auth')
export class AuthController {
    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Session() session: Record<string, any>) {
        session.authenticated = true
        return session
    }

    @Get('encrypt')
    async encrypt(@Query('password') password: string) {
        if (!password) throw new HttpException('Password is required', HttpStatus.BAD_REQUEST)
        return hashPassword(password)
    }

    @Get()
    async getSession(@Session() session: Record<string, any>) {
        console.log(session.authenticated)
        return session
    }

    @Post('logout')
    async logout(@Session() session: Record<string, any>) {
        session.authenticated = false
        session.destroy()
        return session
    }
}
