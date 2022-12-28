import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany
} from 'typeorm'

import { Activity, Order } from 'entities'

@Entity({ name: 'activity_status' })
export class ActivityStatus extends BaseEntity {
    @PrimaryGeneratedColumn()
      id: number

    @Column({ unique: true, generated: 'increment' })
      sortId: number

    @Column()
      name: string

    @Column()
      description: string

    @OneToMany(() => Activity, activity => activity.status)
      activity: Activity[]

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
      createdAt: Date

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
      updatedAt: Date

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
      deletedAt: Date
}

@Entity({ name: 'order_status' })
export class OrderStatus extends BaseEntity {
    @PrimaryGeneratedColumn()
      id: number

    @Column({ unique: true, generated: 'increment' })
      sortId: number

    @Column()
      name: string

    @Column()
      description: string

    @OneToMany(() => Order, order => order.status)
      order: Order[]

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
      createdAt: Date

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
      updatedAt: Date

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
      deletedAt: Date
}
