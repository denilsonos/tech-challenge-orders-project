import { FastifyReply, FastifyRequest } from 'fastify'
import { Controller } from '../../../../domain/ports/controllers/controller'
import { CreateOrderUseCase } from '../../../../domain/ports/use-cases/orders/create-order-use-case'
import { z } from 'zod'

export class CreateOrderController implements Controller {
  constructor(private readonly createOrderUseCase: CreateOrderUseCase) {}

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
    const order = await this.createOrderUseCase.execute(
      result.data.items,
      result.data.clientId,
    )
    return reply.status(201).send({
      message: 'Order created successfully!',
      orderId: order.id,
    })
  }

  private validate(body: FastifyRequest['body']) {
    const schema = z.object({
      items: z
        .array(
          z.object({
            itemId: z.number(),
            quantity: z.number(),
          }),
        )
        .nonempty(),
      clientId: z.number().optional(),
    })
    return schema.safeParse(body)
  }
}
