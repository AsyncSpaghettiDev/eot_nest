import * as AdminJSTypeorm from '@adminjs/typeorm'
import AdminJS from 'adminjs'
import { resources } from 'entities'
import { AdminModule } from '@adminjs/nestjs'

const DEFAULT_ADMIN = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD
}

const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN)
  }
  return null
}
const { Resource, Database } = AdminJSTypeorm
AdminJS.registerAdapter({
  Resource, Database
})

export const AdminPanelModule = AdminModule.createAdminAsync({
  useFactory: () => ({
    adminJsOptions: {
      rootPath: '/admin',
      resources,
      branding: {
        companyName: 'EatOnTime - Admin Panel',
        favicon: 'https://eot.vercel.app/favicon.ico'
      }
    },
    auth: {
      authenticate,
      cookieName: 'adminjs',
      cookiePassword: 'secret'
    },
    sessionOptions: {
      resave: true,
      saveUninitialized: true,
      secret: 'secret'
    }
  })
})
