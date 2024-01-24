import { Payment } from '../../../../domain/entitites/payment'
import { PaymentRepository } from '../../../../domain/ports/repositories/payment-repository'
import { GetOrderPaymentUseCase } from '../../../../domain/ports/use-cases/orders/payments/get-order-payment-use-case'

export class GetOrderPaymentUseCaseImpl implements GetOrderPaymentUseCase {
  constructor(private readonly paymentRepository: PaymentRepository) { }

  public async getById(paymentId: number): Promise<Payment | null> {
    return await this.paymentRepository.getById(paymentId)
  }
}
