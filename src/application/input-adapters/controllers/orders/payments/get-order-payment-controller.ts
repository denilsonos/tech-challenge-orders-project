import { FastifyReply, FastifyRequest } from 'fastify'
import { GetOrderUseCase } from '../../../../../domain/ports/use-cases/orders/get-order-use-case'
import { Controller } from '../../../../../domain/ports/controllers/controller'
import { GetOrderPaymentUseCase } from '../../../../../domain/ports/use-cases/orders/payments/get-order-payment-use-case'
import { validateId } from '../../../commons/validators/identifier-validator'


export class GetOrderPaymentController implements Controller {
  constructor(
    private readonly getOrderPaymentUseCase: GetOrderPaymentUseCase,
  ) { }

  public async execute(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<any> {
    const result = validateId(request.params)
    if (!result.success) {
      return reply.status(400).send({
        message: 'Validation error!',
        issues: result.error.issues,
      })
    }

    const payment = await this.getOrderPaymentUseCase.getById(Number(result.data.id))
    if (!payment) {
      return reply.status(404).send({
        message: 'Payment not found!',
      })
    }

    return reply.status(200).send({
      message: 'Payment found successfully!',
      payment: payment.fromEntity(),
    })
  }
}
