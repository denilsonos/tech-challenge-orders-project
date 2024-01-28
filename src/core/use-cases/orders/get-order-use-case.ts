import { OrderRepository } from '../../../adapters/gateways/repositories/order-repository'
import { GetOrderUseCase } from '../../../adapters/gateways/use-cases/orders/get-order-use-case'
import { OrderDAO } from '../../../base/dao/order'

export class GetOrderUseCaseImpl implements GetOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  public async getById(orderId: number): Promise<OrderDAO | null> {
    return await this.orderRepository.getById(orderId)
  }
}
