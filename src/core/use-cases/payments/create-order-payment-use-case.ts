import { PaymentServiceAdapter } from '../../../adapters/gateways/payment-service-adapter'
import { OrderRepository } from '../../../adapters/gateways/repositories/order-repository'
import { PaymentRepository } from '../../../adapters/gateways/repositories/payment-repository'
import { CreateOrderPaymentUseCase } from '../../../adapters/gateways/use-cases/payments/create-order-payment-use-case'
import { PaymentDAO } from '../../../base/dao/payment'
import { OrderDTO } from '../../../base/dto/order'
import { OrderStatus } from '../../entities/enums/order-status'
import { PaymentEntity } from '../../entities/payment'

export class CreateOrderPaymentUseCaseImpl
  implements CreateOrderPaymentUseCase
{
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly paymentService: PaymentServiceAdapter,
    private readonly orderRespository: OrderRepository,
  ) {}

  public async execute(order: OrderDTO): Promise<PaymentEntity> {
    const qrCodeImage = await this.paymentService.create(order)
    const payment = new PaymentDAO()
    order.status = OrderStatus.PendingPayment
    payment.value = order.total
    payment.status = order.status
    payment.qrCode = Buffer.from(qrCodeImage)
    await this.orderRespository.update(order.id!, order.status)
    const paymentDAO = await this.paymentRepository.save(payment)
    return paymentDAO.daoToEntity()
  }
}
