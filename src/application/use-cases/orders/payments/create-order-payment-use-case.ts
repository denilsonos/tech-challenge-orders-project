import { Order } from '../../../../domain/entitites/order'
import { Payment } from '../../../../domain/entitites/payment'
import { PaymentRepository } from '../../../../domain/ports/repositories/payment-repository'
import { CreateOrderPaymentUseCase } from '../../../../domain/ports/use-cases/orders/payments/create-order-payment-use-case'
import { PaymentServiceAdapter } from '../../../output-adapters/external-services/payment-service-adapter'

export class CreateOrderPaymentUseCaseImpl implements CreateOrderPaymentUseCase {
  constructor(private readonly paymentRepository: PaymentRepository, private readonly paymentService: PaymentServiceAdapter) { }

  public async execute(order: Order): Promise<Payment> {
    const qrCodeImage = await this.paymentService.create(order)
    const payment = new Payment()
    payment.toEntity({ order, qrCodeImage })
    return await this.paymentRepository.save(payment)
  }
}
