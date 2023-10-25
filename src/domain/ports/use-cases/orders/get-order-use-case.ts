import { Order } from '../../../entitites/order'

export interface GetOrderUseCase {
  getById(orderId: number): Promise<Order | null>
}
