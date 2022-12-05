import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as session from 'express-session'
import * as passport from 'passport'
import { SessionEntity } from 'entities'
import { TypeormStore } from 'connect-typeorm/out'
import { DataSource } from 'typeorm'


async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    // Server configs
    app.setGlobalPrefix('api')
    app.enableCors({
        // origin: 'http://localhost:4200',
        // credentials: true,
    })
    const PORT = process.env.PORT || 5000


    const sessionRepository = app.get(DataSource).getRepository(SessionEntity)
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 12 // 12 hours
        },
        store: new TypeormStore({ cleanupLimit: 10, }).connect(sessionRepository),
    }))

    // Passport
    app.use(passport.initialize())
    app.use(passport.session())
    await app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
}
bootstrap()