import { FastifyReply, FastifyRequest } from 'fastify'
import { Controller } from '../../../../domain/ports/controllers/controller'
import { z } from 'zod'
import { GetOrderUseCase } from '../../../../domain/ports/use-cases/orders/get-order-use-case'

export class GetOrderController implements Controller {
  constructor(private readonly getOrderUseCase: GetOrderUseCase) { }

  public async execute(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<any> {
    const result = this.validate(request.params)
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

  private validate(params: FastifyRequest['params']) {
    const schema = z.object({
      id: z.string().min(1).refine(value => {
        const parsedNumber = Number(value);
        return !isNaN(parsedNumber);
      }, {
        message: 'Invalid number format',
      })
    })
    return schema.safeParse(params)
  }
}
