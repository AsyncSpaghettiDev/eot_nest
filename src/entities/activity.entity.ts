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
import { Table, ActivityStatus } from 'entities'

@Entity({ name: 'activities' })
export class Activity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    tableId: number

    @OneToOne(() => Table)
    @JoinColumn()
    table: Table

    @Column()
    statusId: number

    @ManyToOne(() => ActivityStatus, status => status.activity)
    status: ActivityStatus

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updatedAt: Date

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deletedAt: Date
}
