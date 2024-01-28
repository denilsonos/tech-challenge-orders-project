import { OrderDTO } from '../../../../base/dto/order'
import { PaymentEntity } from '../../../../core/entities/payment'

export interface CreateOrderPaymentUseCase {
  execute(order: OrderDTO): Promise<PaymentEntity>
}
