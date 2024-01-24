import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToMany } from 'typeorm'
import { Item, ItemEntity } from './item'
import { OrderStatus } from './enums/order-status'
import { Payment } from './payment'
import  {FakeQueue } from "../../adapters/external-services/fake-queue-service/fake-queue-service-adapter"

type OrderProps = {
  items: Item[]
  clientId?: number
}

export type OrderEntity = {
  orderId: number
  status: string
  clientId?: number
  items: ItemEntity[],
  total: number | string,
  createdAt: Date,
  updatedAt: Date,
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

  @CreateDateColumn({ type: "datetime", name: 'createdAt' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'updatedAt' })
  public updatedAt!: Date;

  @ManyToMany(() => Item, (item) => item.orders)
  public items?: Item[]

  @OneToOne(() => Payment, (payment) => payment.order)
  public payment?: Payment

  @OneToOne(() => FakeQueue, (queue) => queue.order)
  public queue?: FakeQueue

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
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }

  private calculateTotal(items: Item[]): number {
    return items.reduce((total, item) => {
      return total + item.quantity! * Number(item.value)
    }, 0)
  }
}
