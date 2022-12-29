import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as session from 'express-session'
import * as passport from 'passport'
import { SessionEntity } from 'entities'
import { TypeormStore } from 'connect-typeorm/out'
import { DataSource } from 'typeorm'
import { NestExpressApplication } from '@nestjs/platform-express'

async function bootstrap () {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.setGlobalPrefix('api')
  app.enableCors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
  })
  const PORT = process.env.PORT || 5000

  console.log('NODE_ENV', process.env.NODE_ENV)
  const sessionRepository = app.get(DataSource).getRepository(SessionEntity)
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    proxy: process.env.NODE_ENV === 'production',
    cookie: {
      maxAge: 1000 * 60 * 60 * 12, // 12 hours
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      httpOnly: true
    },
    store: new TypeormStore({ cleanupLimit: 10 }).connect(sessionRepository)
  }))

  // Passport
  app.use(passport.initialize())
  app.use(passport.session())
  await app.listen(PORT)
}
bootstrap()
