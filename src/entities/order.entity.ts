import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable
} from 'typeorm'
import { OrderStatus, Activity, Plate, Notes } from 'entities'

@Entity({ name: 'orders' })
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn()
      id: number

    @Column()
      quantity: number

    @Column({ type: 'decimal', precision: 10, scale: 2 })
      subtotal: number

    @Column()
      activityId: number

    @ManyToOne(() => Activity, activity => activity.orders)
      activity: Activity

    @Column()
      plateId: number

    @ManyToOne(() => Plate, plate => plate.order)
      plate: Plate

    @ManyToMany(() => Notes)
    @JoinTable()
      notes: Notes[]

    @Column({ type: 'text', nullable: true })
      comments: string

    @Column()
      statusId: number

    @ManyToOne(() => OrderStatus, status => status.order)
      status: OrderStatus

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
      createdAt: Date

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
      updatedAt: Date

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
      deletedAt: Date
}
