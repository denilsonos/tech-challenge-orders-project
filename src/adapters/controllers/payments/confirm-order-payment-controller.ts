import { FastifyReply, FastifyRequest } from 'fastify'
import { GetOrderUseCase } from '../../../../../domain/ports/use-cases/orders/get-order-use-case'
import { Controller } from '../../../../../domain/ports/controllers/controller'
import { z } from 'zod'
import { GetOrderPaymentUseCase } from '../../../../../domain/ports/use-cases/orders/payments/get-order-payment-use-case'
import { Payment } from '../../../../../domain/entitites/payment'
import { PaymentStatus } from '../../../../../domain/enums/payment-status'
import { Order } from '../../../../../domain/entitites/order'
import { OrderStatus } from '../../../../../domain/enums/order-status'
import { ConfirmOrderPaymentUseCase } from '../../../../../domain/ports/use-cases/orders/payments/confirm-order-payment-use-case'


export class ConfirmOrderPaymentController implements Controller {
  constructor(
    private readonly getOrderPaymentUseCase: GetOrderPaymentUseCase,
    private readonly getOrderUseCase: GetOrderUseCase,
    private readonly confirmOrderPaymentUseCase: ConfirmOrderPaymentUseCase,
  ) { }

  public async execute(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<any> {
    const result = this.validate(request.body)
    if (!result.success) {
      return reply.status(400).send({
        message: 'Validation error!',
        issues: result.error.issues,
      })
    }

    const { paymentId, orderId } = result.data

    const [payment, order] = await this.validatePaymentAndOrder(paymentId, orderId, reply)

    await this.confirmOrderPaymentUseCase.execute(payment, order)
    return reply.status(200).send({
      message: 'Order payment confirmed successfully',
    })
  }

  private validate(body: FastifyRequest['body']) {
    const schema = z.object({
      paymentId: z.number(),
      orderId: z.number(),
    })
    return schema.safeParse(body)
  }

  private async validatePaymentAndOrder(paymentId: number, orderId: number, reply: FastifyReply): Promise<[Payment, Order]> {
    return await Promise.all([this.validatePayment(paymentId, reply), this.validateOrder(orderId, reply)])
  }

  private async validatePayment(paymentId: number, reply: FastifyReply): Promise<Payment> {
    const payment = await this.getOrderPaymentUseCase.getById(paymentId)
    if (!payment) {
      return reply.status(400).send({
        message: `Payment identifier ${paymentId} is invalid!`,
      })
    }
    if (payment.status === PaymentStatus.Confirmed) {
      return reply.status(409).send({
        message: `Payment has already been made!`,
      })
    }
    return payment
  }

  private async validateOrder(orderId: number, reply: FastifyReply): Promise<Order> {
    const order = await this.getOrderUseCase.getById(orderId)
    if (!order) {
      return reply.status(400).send({
        message: `Order identifier ${orderId} is invalid!`,
      })
    }
    if (order.status !== OrderStatus.PendingPayment) {
      return reply.status(409).send({
        message: `Order does not have a pending payment!`,
      })
    }
    return order
  }
}
