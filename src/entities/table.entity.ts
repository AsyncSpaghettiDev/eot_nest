import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany
} from 'typeorm'
import { Activity } from 'entities'

@Entity({ name: 'tables' })
export class Table extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true, generated: 'increment' })
  sortId: number

  @Column()
  name: string

  @Column()
  capacity: number

  @OneToMany(() => Activity, activity => activity.table, { nullable: true })
  activities: Activity[]

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updatedAt: Date

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deletedAt: Date
}
