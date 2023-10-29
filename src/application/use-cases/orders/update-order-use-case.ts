import { UpdateOrderParams } from '../../../domain/dtos/update-order-params'
import { Order } from '../../../domain/entitites/order'
import { OrderRepository } from '../../../domain/ports/repositories/order-repository'
import { UpdateOrderUseCase } from '../../../domain/ports/use-cases/orders/update-order-use-case'
import { QueueServiceAdapter } from '../../output-adapters/external-services/queue-service-adapter'

export class UpdateOrderUseCaseImpl implements UpdateOrderUseCase {
  constructor(private readonly queueService: QueueServiceAdapter, private readonly orderRepository: OrderRepository) { }

  async update(order: Order, params: UpdateOrderParams): Promise<void> {
    await this.queueService.dequeue(order)
    await this.orderRepository.update(order.id!, params)
  }
}
