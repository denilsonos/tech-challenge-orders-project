import { Order } from '../../../../domain/entitites/order'
import { Payment } from '../../../../domain/entitites/payment'
import { OrderStatus } from '../../../../domain/enums/order-status'
import { OrderRepository } from '../../../../domain/ports/repositories/order-repository'
import { PaymentRepository } from '../../../../domain/ports/repositories/payment-repository'
import { CreateOrderPaymentUseCase } from '../../../../domain/ports/use-cases/orders/payments/create-order-payment-use-case'
import { PaymentServiceAdapter } from '../../../output-adapters/external-services/payment-service-adapter'

export class CreateOrderPaymentUseCaseImpl implements CreateOrderPaymentUseCase {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly paymentService: PaymentServiceAdapter,
    private readonly orderRespository: OrderRepository,
  ) { }

  public async execute(order: Order): Promise<Payment> {
    const qrCodeImage = await this.paymentService.create(order)
    const payment = new Payment()
    order.status = OrderStatus.PendingPayment
    payment.toEntity({ order, qrCodeImage })
    await this.orderRespository.update(order.id!, { status: order.status })
    return await this.paymentRepository.save(payment)
  }
}
