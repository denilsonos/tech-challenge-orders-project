import { Order } from '../../entitites/order'

export interface OrderRepository {
  save(order: Order): Promise<void>
  getById(orderId: number): Promise<Order>
}
