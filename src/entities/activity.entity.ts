import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany
} from 'typeorm'
import { Table, ActivityStatus, Order } from 'entities'

@Entity({ name: 'activities' })
export class Activity extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    people: number

  @Column()
    tableId: number

  @ManyToOne(() => Table, table => table.activities)
    table: Table

  @Column()
    statusId: number

  @ManyToOne(() => ActivityStatus, status => status.activity)
    status: ActivityStatus

  @OneToMany(() => Order, order => order.activity)
    orders: Order[]

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    start: Date

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
    end: Date
}
