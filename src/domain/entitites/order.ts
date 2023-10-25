import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Item, ItemEntity } from './item'
import { OrderStatus } from '../enums/order-status'

type OrderProps = {
  items: Item[]
  clientId?: number
}

type OrderEntity = {
  orderId: number
  status: string
  clientId?: number
  items: ItemEntity[],
  total: number | string
}

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  public id?: number

  @Column({ type: 'varchar', name: 'status' })
  public status!: string

  @Column({ type: 'int', name: 'clientId', default: null })
  public clientId: number | undefined

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'total', default: 0 })
  public total!: number

  @OneToMany(() => Item, (item) => item.order)
  public items?: Item[]

  constructor() { }

  public toEntity(props: OrderProps): void {
    this.items = props.items
    this.status = OrderStatus.Created
    this.clientId = props.clientId
    this.total = this.calculateTotal(props.items)
  }

  public fromEntity(): OrderEntity {
    return {
      orderId: this.id!,
      status: this.status,
      clientId: this.clientId,
      total: this.total,
      items: this.items!.map((item) => item.fromEntity()),
    }
  }

  private calculateTotal(items: Item[]): number {
    return items.reduce((total, item) => {
      return total + item.quantity! * Number(item.value)
    }, 0)
  }
}
