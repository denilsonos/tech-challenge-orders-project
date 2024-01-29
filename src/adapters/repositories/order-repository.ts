import { OrderRepository } from '../gateways/repositories/order-repository'
import { OrderDAO } from '../../base/dao/order'
import { DbConnection } from '../gateways/db/db-connection'

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
