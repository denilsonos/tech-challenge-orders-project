import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Order } from './order'

@Entity('item')
export class Item {
  @PrimaryGeneratedColumn({ type: 'number', name: 'id' })
  public id: number

  @Column({ type: 'number', name: 'quantity' })
  public quantity: number

  @OneToMany(() => Order, (order) => order.items)
  public order!: Order

  constructor(id: number, quantity: number) {
    this.id = id
    this.quantity = quantity
  }
}
