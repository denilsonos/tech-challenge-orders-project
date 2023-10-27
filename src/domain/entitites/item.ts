import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Order } from './order'

type ItemProps = {
  name: string
  description: string
  category: string
  value: number
  image: string
}

export type ItemEntity = {
  itemId: number
  name: string
  description: string
  category: string
  value: number | string
  image: string
  createdAt: Date
  updatedAt: Date
}

@Entity('item')
export class Item {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  public id?: number

  @Column({ type: 'varchar', name: 'name' })
  public name!: string

  @Column({ type: 'varchar', name: 'description' })
  public description!: string

  @Column({ type: 'varchar', name: 'category' })
  public category!: string

  @Column({ type: 'decimal', precision: 5, scale: 2, name: 'value' })
  public value!: number | string

  @Column({ type: 'longblob', name: 'image' })
  public image!: Buffer

  @Column({ type: 'int', name: 'quantity', default: null })
  public quantity?: number

  @CreateDateColumn({ type: "datetime", name: 'createdAt' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'updatedAt' })
  public updatedAt!: Date;

  @ManyToOne(() => Order, (order) => order.items)
  public order?: Order

  constructor() { }

  public toEntity(props: ItemProps): void {
    this.name = props.name
    this.description = props.description
    this.category = props.category
    this.value = props.value
    this.image = Buffer.from(props.image, 'base64')
  }

  public fromEntity(): ItemEntity {
    return {
      itemId: this.id!,
      name: this.name,
      description: this.description,
      category: this.category,
      value: this.value,
      image: this.image.toString('base64'),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}
