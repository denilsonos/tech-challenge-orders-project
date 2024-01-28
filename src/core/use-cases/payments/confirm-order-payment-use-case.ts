import { QueueServiceAdapter } from '../../../adapters/gateways/queue-service-adapter'
import { PaymentRepository } from '../../../adapters/gateways/repositories/payment-repository'
import { ConfirmOrderPaymentUseCase } from '../../../adapters/gateways/use-cases/payments/confirm-order-payment-use-case'
import { OrderDTO } from '../../../base/dto/order'
import { PaymentDTO } from '../../../base/dto/payment'
import { PaymentStatus } from '../../entities/enums/payment-status'

export class ConfirmOrderPaymentUseCaseImpl
  implements ConfirmOrderPaymentUseCase
{
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly queueService: QueueServiceAdapter,
  ) {}

  public async execute(payment: PaymentDTO, order: OrderDTO): Promise<void> {
    await this.paymentRepository.update(payment.id!, {
      status: PaymentStatus.Confirmed,
    })
    await this.queueService.toqueue(order)
  }
}
