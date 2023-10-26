import { FindOrderParams } from '../../../dtos/find-order-params'
import { Order } from '../../../entitites/order'

export interface FindOrderUseCase {
  findByParams(params: FindOrderParams): Promise<Order[] | []>
}
