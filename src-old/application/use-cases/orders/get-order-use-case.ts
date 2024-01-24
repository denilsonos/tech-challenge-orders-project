import { Order } from '../../../domain/entitites/order'
import { OrderRepository } from '../../../domain/ports/repositories/order-repository'
import { GetOrderUseCase } from '../../../domain/ports/use-cases/orders/get-order-use-case'

export class GetOrderUseCaseImpl implements GetOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  public async getById(orderId: number): Promise<Order | null> {
    return await this.orderRepository.getById(orderId)
  }
}
