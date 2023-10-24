import { Order } from '../../../domain/entitites/order'
import { OrderRepository } from '../../../domain/ports/repositories/order-repository'
import { CreateOrderUseCase } from '../../../domain/ports/use-cases/orders/create-order-use-case'

export class CreateOrderUseCaseImpl implements CreateOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  public async execute(
    items: { itemId: number; quantity: number }[],
    clientId?: number,
  ): Promise<Order> {
    const order = new Order(clientId)
    order.setItems(items)
    await this.orderRepository.save(order)
    return order
  }
}
