import { Item } from '../../../entitites/item'
import { Order } from '../../../entitites/order'

export interface CreateOrderUseCase {
  execute(items: Item[], clientId?: number): Promise<Order>
}
