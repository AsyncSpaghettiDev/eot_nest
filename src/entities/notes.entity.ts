import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Notes extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  description: string

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updatedAt: Date

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deletedAt: Date
}
