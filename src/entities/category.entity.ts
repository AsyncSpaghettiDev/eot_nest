import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    UpdateDateColumn,
    CreateDateColumn
} from "typeorm"
import { Plate } from "entities"

@Entity({ name: "categories" })
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @OneToMany(() => Plate, (plate) => plate.category)
    plates: Plate[]

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updatedAt: Date

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date
}