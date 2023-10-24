import { Order } from '../../../entitites/order'

export interface CreateOrderUseCase {
  execute(
    items: { itemId: number; quantity: number }[],
    clientId?: number,
  ): Promise<Order>
}
