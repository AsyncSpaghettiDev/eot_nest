import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn
} from 'typeorm'
import { Category, Order } from 'entities'

@Entity({ name: 'plates' })
export class Plate extends BaseEntity {
    @PrimaryGeneratedColumn()
      id: number

    @Column({ unique: true })
      name: string

    @Column()
      price: number

    @Column()
      description: string

    @Column()
      image: string

    @Column({ default: 1 })
      quantity: number

    @Column({ default: false })
      isVeg: boolean

    @Column()
      categoryId: number

    @ManyToOne(() => Category, (category) => category.plates)
      category: Category

    @OneToMany(() => Order, (order) => order.plate)
      order: Order[]

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
      updatedAt: Date

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
      createdAt: Date

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
      deletedAt: Date
}
