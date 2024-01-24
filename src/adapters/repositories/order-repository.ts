import { DataSource } from 'typeorm'
import { Order } from '../../../domain/entitites/order'
import { OrderRepository } from '../../../domain/ports/repositories/order-repository'
import { FindOrderParams } from '../../../domain/dtos/find-order-params'
import { UpdateOrderParams } from '../../../domain/dtos/update-order-params'

export class OrderRepositoryImpl implements OrderRepository {
  constructor(private readonly database: DataSource) { }

  async save(order: Order): Promise<Order> {
    const repository = this.database.getRepository(Order)
    return await repository.save(order)
  }

  async getById(orderId: number): Promise<Order | null> {
    const repository = this.database.getRepository(Order)
    return await repository.findOne({ where: { id: orderId }, relations: ['items'] })
  }

  async findByParams(params: FindOrderParams): Promise<Order[] | []> {
    const repository = this.database.getRepository(Order)
    return await repository.find({ where: params, relations: ['items'] })
  }

  async update(orderId: number, params: UpdateOrderParams): Promise<void> {
    const repository = this.database.getRepository(Order)
    await repository.update(orderId, params)
  }
}
