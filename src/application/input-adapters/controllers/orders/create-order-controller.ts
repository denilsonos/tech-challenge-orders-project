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
    const bodySchema = z.object({
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
    const { items, clientId } = bodySchema.parse(request.body)
    const order = await this.createOrderUseCase.execute(items, clientId)
    return reply.status(201).send({
      message: 'Pedido criado com sucesso!',
      orderId: order.id,
    })
  }
}
