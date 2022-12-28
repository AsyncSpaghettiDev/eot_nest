import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn
} from 'typeorm'
import { Role, Table } from 'entities'

@Entity({ name: 'users' })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
      id: number

    @Column({ unique: true })
      username: string

    @Column()
      password: string

    // table relation
    @Column({ nullable: true })
      tableId: number

    @OneToOne(() => Table)
    @JoinColumn()
      table: Table

    // role relation
    @Column()
      roleId: number

    @ManyToOne(() => Role, role => role.user)
      role: Role

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
      updatedAt: Date

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
      createdAt: Date

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
      deletedAt: Date
}
