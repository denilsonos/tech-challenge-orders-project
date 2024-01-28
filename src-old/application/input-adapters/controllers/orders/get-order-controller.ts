import { FastifyReply, FastifyRequest } from 'fastify'
import { Controller } from '../../../../domain/ports/controllers/controller'
import { GetOrderUseCase } from '../../../../domain/ports/use-cases/orders/get-order-use-case'
import { validateId } from '../../commons/validators/identifier-validator'

export class GetOrderController implements Controller {
  constructor(private readonly getOrderUseCase: GetOrderUseCase) { }

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
    const order = await this.getOrderUseCase.getById(Number(result.data.id))
    if (!order) {
      return reply.status(404).send({
        message: 'Order not found!',
      })
    }
    return reply.status(200).send({
      message: 'Order found successfully!',
      order: order.fromEntity(),
    })
  }
}
