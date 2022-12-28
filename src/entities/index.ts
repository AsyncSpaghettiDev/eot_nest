import { Role } from './role.entity'
import { SessionEntity } from './session.entity'
import { User } from './user.entity'
import { Plate } from './plate.entity'
import { Category } from './category.entity'
import { Activity } from './activity.entity'
import { Table } from './table.entity'
import { ActivityStatus, OrderStatus } from './status.entity'
import { Order } from './order.entity'
import { Notes } from './notes.entity'

export {
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
}

export const entities = [
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
]

export const resources = [
  User,
  Role,
  Plate,
  Category,
  Table,
  Activity,
  Order,
  Notes,
  ActivityStatus,
  OrderStatus
]
