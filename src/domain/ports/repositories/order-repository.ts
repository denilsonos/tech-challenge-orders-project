import { Order } from '../../entitites/order'

export interface OrderRepository {
  save(order: Order): Promise<Order>
  getById(orderId: number): Promise<Order | null>
}
