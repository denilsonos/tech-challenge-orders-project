import { FastifyReply, FastifyRequest } from 'fastify'
import { GetOrderUseCase } from '../../../../../domain/ports/use-cases/orders/get-order-use-case'
import { Controller } from '../../../../../domain/ports/controllers/controller'
import { CreateOrderPaymentUseCase } from '../../../../../domain/ports/use-cases/orders/payments/create-order-payment-use-case'
import { z } from 'zod'
import { OrderStatus } from '../../../../../domain/enums/order-status'


export class CreateOrderPaymentController implements Controller {
  constructor(
    private readonly getOrderUseCase: GetOrderUseCase,
    private readonly createOrderPaymentUseCase: CreateOrderPaymentUseCase,
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

    const { orderId } = result.data
    const order = await this.getOrderUseCase.getById(result.data.orderId)
    if (!order) {
      return reply.status(400).send({
        message: `Order identifier ${orderId} is invalid!`,
      })
    }

    if (order.status !== OrderStatus.Created) {
      return reply.status(409).send({
        message: `Order already has a pending payment!!`,
      })
    }

    const payment = await this.createOrderPaymentUseCase.execute(order)
    return reply.status(201).send({
      message: 'Payment for the order created successfully!',
      payment: payment.fromEntity(),
    })
  }

  private validate(body: FastifyRequest['body']) {
    const schema = z.object({
      orderId: z.number(),
    })
    return schema.safeParse(body)
  }
}
