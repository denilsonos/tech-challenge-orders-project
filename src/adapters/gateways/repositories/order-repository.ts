import { OrderEntity } from '../../../../src-old/domain/entitites/order'
import { OrderDAO } from '../../../base/dao/order'

export interface OrderRepository {
  save(order: OrderDAO): Promise<OrderDAO>
  getById(orderId: number): Promise<OrderDAO | null>
  findByParams(clientId?: number | undefined, status?: string | undefined): Promise<OrderDAO[] | []>
  update(orderId: number, status: string): Promise<void>
}
