import { DataSource } from 'typeorm'
import { Order } from '../../../domain/entitites/order'
import { OrderRepository } from '../../../domain/ports/repositories/order-repository'

export class OrderRepositoryImpl implements OrderRepository {
  constructor(private readonly database: DataSource) {}

  async save(order: Order): Promise<void> {
    const repository = this.database.getRepository(Order)
    await repository.save(order)
  }

  async getById(orderId: number): Promise<Order> {
    throw new Error('Method not implemented.')
  }
}
