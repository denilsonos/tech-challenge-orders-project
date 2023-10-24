import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Item } from './item'

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn({ type: 'number', name: 'id' })
  public id!: number

  @Column({ type: 'number', name: 'clientId' })
  public clientId: number | undefined

  @ManyToOne(() => Item, (item) => item.order)
  public items: Item[] = []

  constructor(clientId?: number) {
    this.clientId = clientId ?? undefined
  }

  public setItems(items: { itemId: number; quantity: number }[]): void {
    items.forEach((item) => {
      this.items.push(new Item(item.itemId, item.quantity))
    })
  }
}
