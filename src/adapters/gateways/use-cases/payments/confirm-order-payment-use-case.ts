import { OrderDTO } from '../../../../base/dto/order'
import { PaymentDTO } from '../../../../base/dto/payment'

export interface ConfirmOrderPaymentUseCase {
  execute(payment: PaymentDTO, order: OrderDTO): Promise<void>
}
