import { DataSource } from 'typeorm'
import { OrderRepository } from '../gateways/repositories/order-repository'
import { FindOrderParams } from '../gateways/dtos/find-order-params'
import { UpdateOrderParams } from '../gateways/dtos/update-order-params'
import { OrderDAO } from '../../base/dao/order'
import { DbConnection } from '../gateways/interfaces/db-connection'

export class OrderRepositoryImpl implements OrderRepository {
  constructor(private readonly database: DbConnection) { }

  async save(order: OrderDAO): Promise<OrderDAO> {
    const repository = this.database.getConnection().getRepository(OrderDAO)
    return await repository.save(order)
  }

  async getById(orderId: number): Promise<OrderDAO | null> {
    const repository = this.database.getConnection().getRepository(OrderDAO)
    return await repository.findOne({ where: { id: orderId }, relations: ['items'] })
  }

  async findByParams(clientId?: number | undefined, status?: string | undefined): Promise<OrderDAO[] | []> {
    const repository = this.database.getConnection().getRepository(OrderDAO)
    return await repository.find({ where: {clientId : clientId, status: status} , relations: ['items'] })
  }

  async update(orderId: number, status: string): Promise<void> {
    const repository = this.database.getConnection().getRepository(OrderDAO)
    await repository.update(orderId, {status})
  }
}
