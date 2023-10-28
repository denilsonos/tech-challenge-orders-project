import { Order } from '../../../../domain/entitites/order'
import { Payment } from '../../../../domain/entitites/payment'
import { PaymentStatus } from '../../../../domain/enums/payment-status'
import { PaymentRepository } from '../../../../domain/ports/repositories/payment-repository'
import { ConfirmOrderPaymentUseCase } from '../../../../domain/ports/use-cases/orders/payments/confirm-order-payment-use-case'
import { QueueServiceAdapter } from '../../../output-adapters/external-services/queue-service-adapter'

export class ConfirmOrderPaymentUseCaseImpl implements ConfirmOrderPaymentUseCase {
  constructor(private readonly paymentRepository: PaymentRepository, private readonly queueService: QueueServiceAdapter) { }

  public async execute(payment: Payment, order: Order): Promise<void> {
    await this.paymentRepository.update(payment.id!, { status: PaymentStatus.Confirmed })
    await this.queueService.toqueue(order)
  }
}
