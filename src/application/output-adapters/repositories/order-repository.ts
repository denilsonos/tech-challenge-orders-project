import { DataSource } from 'typeorm'
import { Order } from '../../../domain/entitites/order'
import { OrderRepository } from '../../../domain/ports/repositories/order-repository'

export class OrderRepositoryImpl implements OrderRepository {
  constructor(private readonly database: DataSource) {}

  async save(order: Order): Promise<Order> {
    const repository = this.database.getRepository(Order)
    return await repository.save(order)
  }

  async getById(orderId: number): Promise<Order | null> {
    const repository = this.database.getRepository(Order)
    return await repository.findOne({ where: { id: orderId }, relations: ['items'] })
  }
}
