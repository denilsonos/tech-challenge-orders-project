import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToMany } from 'typeorm'
import { ItemDAO } from './item'
import { Payment } from '../../core/entities/payment'
import { FakeQueue } from '../../adapters/external-services/fake-queue-service/fake-queue-service-adapter'


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

  @ManyToMany(() => ItemDAO, (item) => item.orders)
  public items?: ItemDAO[]

  @OneToOne(() => Payment, (payment) => payment.order)
  public payment?: Payment

  @OneToOne(() => FakeQueue, (queue) => queue.order)
  public queue?: FakeQueue

  constructor() { }

}