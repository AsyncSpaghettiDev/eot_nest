import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn
} from 'typeorm'
import { Plate } from 'entities'

@Entity({ name: 'categories' })
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column({ unique: true, generated: 'increment' })
    sortId: number

  @Column()
    name: string

  @Column()
    description: string

  @OneToMany(() => Plate, (plate) => plate.category)
    plates: Plate[]

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updatedAt: Date

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
    deletedAt: Date
}
