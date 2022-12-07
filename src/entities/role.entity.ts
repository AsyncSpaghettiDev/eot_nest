import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    UpdateDateColumn,
    CreateDateColumn
} from 'typeorm'
import { User } from 'entities'

@Entity({ name: 'roles' })
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true, generated: 'increment' })
    sortId: number

    @Column()
    name: string

    @Column()
    description: string

    @Column({ default: false })
    isStaff: boolean

    @OneToMany(_ => User, user => user.role)
    user: User

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updatedAt: Date

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date
}