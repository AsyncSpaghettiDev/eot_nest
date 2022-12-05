import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToOne,
    ManyToOne,
    JoinColumn,
} from 'typeorm'
import { OrderStatus, Activity, Plate } from 'entities'

@Entity({ name: 'orders' })
export class Order {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    activityId: number

    @OneToOne(() => Activity)
    @JoinColumn()
    activity: Activity

    @Column()
    plateId: number

    @ManyToOne(() => Plate, plate => plate.order)
    plate: Plate

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