import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToMany } from 'typeorm'
import { ItemDAO } from './item'
import { Payment } from '../../core/entities/payment'
import { FakeQueue } from '../../adapters/external-services/fake-queue-service/fake-queue-service-adapter'
import { ItemEntity } from '../../core/entities/item'
import { OrderEntity } from '../../core/entities/order'


@Entity('order')
export class OrderDAO {
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

  constructor(status: string, clientId: number | undefined, total: number, createdAt: Date, updatedAt: Date, items: ItemDAO[], id?: number) { }

  static daoToEntity(orderDao: OrderDAO): OrderEntity {
    const itemsOrder = ItemDAO.daosToEntities(orderDao.items!)
    return new OrderEntity(orderDao.status, orderDao.clientId, orderDao.total,
       orderDao.createdAt, orderDao.createdAt, itemsOrder, orderDao.id!);
  }

  static daosToEntities(orderDaos: OrderDAO[]): OrderEntity[] {

    const listEntities: OrderEntity[] = [];

    orderDaos.forEach(orderDAO => {
      listEntities.push(OrderDAO.daoToEntity(orderDAO))
    });

    return listEntities;
  }

}