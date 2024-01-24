import { FindOrderParams } from '../../../domain/dtos/find-order-params'
import { Order } from '../../../domain/entitites/order'
import { OrderRepository } from '../../../domain/ports/repositories/order-repository'
import { FindOrderUseCase } from '../../../domain/ports/use-cases/orders/find-order-use-case'

export class FindOrderUseCaseImpl implements FindOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async findByParams(params: FindOrderParams): Promise<Order[] | []> {
    return await this.orderRepository.findByParams(params)
  }
}
