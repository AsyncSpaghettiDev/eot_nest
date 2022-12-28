import { DataSource } from 'typeorm'
import { ConfigModule } from '@nestjs/config'

import { activityStatus1671843784144 } from 'migrations/1671843784144-activity_status'
import { orderStatus1671844158031 } from 'migrations/1671844158031-order_status'
import { roles1671844314438 } from 'migrations/1671844314438-roles'
import { notes1671844549649 } from 'migrations/1671844549649-notes'

import { Role } from 'entities/role.entity'
import { SessionEntity } from 'entities/session.entity'
import { User } from 'entities/user.entity'
import { Plate } from 'entities/plate.entity'
import { Category } from 'entities/category.entity'
import { Activity } from 'entities/activity.entity'
import { Table } from 'entities/table.entity'
import { ActivityStatus, OrderStatus } from 'entities/status.entity'
import { Order } from 'entities/order.entity'
import { Notes } from 'entities/notes.entity'

ConfigModule.forRoot()

export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    Role,
    User,
    SessionEntity,
    Plate,
    Category,
    Activity,
    Table,
    ActivityStatus,
    OrderStatus,
    Order,
    Notes
  ],
  migrations: [
    activityStatus1671843784144,
    orderStatus1671844158031,
    roles1671844314438,
    notes1671844549649
  ]
})
