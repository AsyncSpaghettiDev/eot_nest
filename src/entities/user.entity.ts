import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    UpdateDateColumn,
    CreateDateColumn
} from 'typeorm'
import { Role } from 'entities'

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    username: string

    @Column()
    password: string

    @Column()
    roleId: number

    // role: Role
    @ManyToOne(_ => Role, role => role.user)
    role: Role

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updatedAt: Date

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date
}