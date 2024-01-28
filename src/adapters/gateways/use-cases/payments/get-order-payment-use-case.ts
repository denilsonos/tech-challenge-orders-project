import { PaymentEntity } from '../../../../core/entities/payment'

export interface GetOrderPaymentUseCase {
  getById(paymentId: number): Promise<PaymentEntity | undefined>
}
