import { UpdateOrderParams } from '../../../dtos/update-order-params'
import { Order } from '../../../entitites/order'

export interface UpdateOrderUseCase {
  update(order: Order, params: UpdateOrderParams): Promise<void>
}
