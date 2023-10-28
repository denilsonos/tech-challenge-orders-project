import { FindOrderParams } from '../../dtos/find-order-params'
import { UpdateOrderParams } from '../../dtos/update-order-params'
import { Order } from '../../entitites/order'

export interface OrderRepository {
  save(order: Order): Promise<Order>
  getById(orderId: number): Promise<Order | null>
  findByParams(params: FindOrderParams): Promise<Order[] | []>
  update(orderId: number, params: UpdateOrderParams): Promise<void>
}
