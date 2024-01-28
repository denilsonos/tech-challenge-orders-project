import { z } from 'zod'
import { BadRequestException } from '../../../core/entities/exceptions'
import { GetOrderUseCase } from '../../gateways/use-cases/orders/get-order-use-case'
import { CreateOrderPaymentUseCase } from '../../gateways/use-cases/payments/create-order-payment-use-case'
import { OrderStatus } from '../../../core/entities/enums/order-status'
import { DataSource } from 'typeorm'
import { GetOrderUseCaseImpl } from '../../../core/use-cases/orders/get-order-use-case'
import { Payment } from '../../gateways/controllers/payment'
import { PaymentDTO } from '../../../base/dto/payment'
import { PaymentPresenter } from '../../presenters/payment'
import { PaymentStatus } from '../../../core/entities/enums/payment-status'
import { Order } from '../../gateways/controllers/order'
import { ConfirmOrderPaymentUseCaseImpl } from '../../../core/use-cases/payments/confirm-order-payment-use-case'
import { ConfirmOrderPaymentUseCase } from '../../gateways/use-cases/payments/confirm-order-payment-use-case'
import { PaymentRepository } from '../../gateways/repositories/payment-repository'
import { PaymentRepositoryImpl } from '../../repositories/payment-repository'
import { QueueServiceAdapter } from '../../gateways/queue-service-adapter'
import { FakeQueueServiceAdapter } from '../../external-services/fake-queue-service/fake-queue-service-adapter'
import { CreateOrderPaymentUseCaseImpl } from '../../../core/use-cases/payments/create-order-payment-use-case'
import { OrderRepository } from '../../gateways/repositories/order-repository'
import { OrderRepositoryImpl } from '../../repositories/order-repository'
import { GetOrderPaymentUseCaseImpl } from '../../../core/use-cases/payments/get-order-payment-use-case'
import { PaymentServiceAdapter } from '../../gateways/payment-service-adapter'
import { FakePaymentServiceAdapter } from '../../external-services/fake-payment-service/fake-payment-service-adapter'

export class PaymentController implements Payment {
  private orderRepository: OrderRepository
  private paymentService: PaymentServiceAdapter
  private createOrderPaymentUseCase: CreateOrderPaymentUseCase
  private getOrderUseCase: GetOrderUseCase
  private paymentRepository: PaymentRepository
  private queueService: QueueServiceAdapter
  private confirmOrderPaymentUseCase: ConfirmOrderPaymentUseCase
  private getOrderPaymentUseCase: GetOrderUseCase
  constructor(readonly database: DataSource) {
    this.orderRepository = new OrderRepositoryImpl(database)
    this.paymentService = new FakePaymentServiceAdapter()
    this.paymentRepository = new PaymentRepositoryImpl(database)
    this.createOrderPaymentUseCase = new CreateOrderPaymentUseCaseImpl(
      this.paymentRepository,
      this.paymentService,
      this.orderRepository,
    )
    this.getOrderUseCase = new GetOrderUseCaseImpl(this.orderRepository)
    this.getOrderPaymentUseCase = new GetOrderPaymentUseCaseImpl(
      this.paymentRepository,
    )
    this.queueService = new FakeQueueServiceAdapter(database)
    this.confirmOrderPaymentUseCase = new ConfirmOrderPaymentUseCaseImpl(
      this.paymentRepository,
      this.queueService,
    )
  }

  // TODO: Verificar tipagem
  async create(bodyParams: unknown): Promise<PaymentDTO> {
    const schema = z.object({
      orderId: z.number(),
    })
    const result = schema.safeParse(bodyParams)
    if (!result.success) {
      throw new BadRequestException('Validation error!', result.error.issues)
    }

    const { orderId } = result.data
    const order = await this.getOrderUseCase.getById(orderId)
    if (!order) {
      throw new BadRequestException(`Order identifier ${orderId} is invalid!`)
    }

    if (order.status !== OrderStatus.Created) {
      throw new BadRequestException(`Order already has a pending payment!!`)
    }

    const payment = await this.createOrderPaymentUseCase.execute(order)
    return PaymentPresenter.EntityToDto(payment)
  }

  // TODO: Verificar tipagem
  async confirm(bodyParams: unknown): Promise<void> {
    const schema = z.object({
      paymentId: z.number(),
      orderId: z.number(),
    })
    const result = schema.safeParse(bodyParams)

    if (!result.success) {
      throw new BadRequestException('Validation error!', result.error.issues)
    }

    const { paymentId, orderId } = result.data

    const [payment, order] = await this.validatePaymentAndOrder(
      paymentId,
      orderId,
    )

    await this.confirmOrderPaymentUseCase.execute(payment, order)
  }

  async getOrder(bodyParams: unknown): Promise<PaymentDTO> {
    const schema = z.object({
      id: z.number(),
    })
    const result = schema.safeParse(bodyParams)

    if (!result.success) {
      throw new BadRequestException('Validation error!', result.error.issues)
    }

    const { id: paymentId } = result.data

    const payment = await this.getOrderPaymentUseCase.getById(paymentId)
    if (!payment) {
      throw new BadRequestException('Payment not found!')
    }

    return PaymentPresenter.EntityToDto(payment)
  }

  private async validatePaymentAndOrder(
    paymentId: number,
    orderId: number,
  ): Promise<[Payment, Order]> {
    return await Promise.all([
      this.validatePayment(paymentId),
      this.validateOrder(orderId),
    ])
  }

  private async validatePayment(paymentId: number): Promise<Payment> {
    const payment = await this.getOrderPaymentUseCase.getById(paymentId)
    if (!payment) {
      throw new BadRequestException(
        `Payment identifier ${paymentId} is invalid!`,
      )
    }
    if (payment.status === PaymentStatus.Confirmed) {
      throw new BadRequestException(`Payment has already been made!`)
    }
    return payment
  }

  private async validateOrder(orderId: number): Promise<Order> {
    const order = await this.getOrderUseCase.getById(orderId)
    if (!order) {
      throw new BadRequestException(`Order identifier ${orderId} is invalid!`)
    }
    if (order.status !== OrderStatus.PendingPayment) {
      throw new BadRequestException(`Order does not have a pending payment!`)
    }
    return order
  }
}
