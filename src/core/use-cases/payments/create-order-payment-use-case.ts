import { PaymentServiceAdapter } from "../../../adapters/gateways/payment-service-adapter"
import { OrderRepository } from "../../../adapters/gateways/repositories/order-repository"
import { PaymentRepository } from "../../../adapters/gateways/repositories/payment-repository"
import { CreateOrderPaymentUseCase } from "../../../adapters/gateways/use-cases/payments/create-order-payment-use-case"
import { OrderStatus } from "../../entities/enums/order-status"
import { OrderEntity } from "../../entities/order"
import { PaymentEntity } from "../../entities/payment"

export class CreateOrderPaymentUseCaseImpl implements CreateOrderPaymentUseCase {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly paymentService: PaymentServiceAdapter,
    private readonly orderRespository: OrderRepository,
  ) { }

  public async execute(order: OrderEntity): Promise<PaymentEntity> {
    const qrCodeImage = await this.paymentService.create(order)
    order.status = OrderStatus.PendingPayment
    const payment = new PaymentEntity(
      Buffer.from(qrCodeImage),
      order.total,
      order.status,
      order
    )
    
    await this.orderRespository.update(order.id!, order.status )
    return await this.paymentRepository.save(payment)
  }
}
