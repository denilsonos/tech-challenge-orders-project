import { FastifyReply, FastifyRequest } from 'fastify'
import { Controller } from '../../../../domain/ports/controllers/controller'
import { z } from 'zod'
import { FindOrderUseCase } from '../../../../domain/ports/use-cases/orders/find-order-use-case'
import { OrderStatus } from '../../../../domain/enums/order-status'

export class FindOrderController implements Controller {
  constructor(private readonly findOrderUseCase: FindOrderUseCase) { }

  public async execute(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<any> {
    const result = this.validate(request.query)
    if (!result.success) {
      return reply.status(400).send({
        message: 'Validation error!',
        issues: result.error.issues,
      })
    }

    const orders = await this.findOrderUseCase.findByParams({
      clientId: result.data.clientId ? Number(result.data.clientId) : undefined,
      status: result.data.status
    })
    return reply.status(200).send({
      message: `${orders.length} orders found!`,
      orders: orders.map((order) => order.fromEntity()),
    })
  }

  private validate(params: FastifyRequest['query']) {
    const schema = z.object({
      clientId: z.string().min(1).refine(value => {
        const parsedNumber = Number(value);
        return !isNaN(parsedNumber);
      }, {
        message: 'Invalid number format',
      }).optional(),
      status: z.nativeEnum(OrderStatus).optional(),
    })
    return schema.safeParse(params)
  }
}
