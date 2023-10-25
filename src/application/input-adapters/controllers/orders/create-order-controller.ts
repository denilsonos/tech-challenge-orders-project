import { FastifyReply, FastifyRequest } from 'fastify'
import { Controller } from '../../../../domain/ports/controllers/controller'
import { CreateOrderUseCase } from '../../../../domain/ports/use-cases/orders/create-order-use-case'
import { z } from 'zod'
import { GetItemUseCase } from '../../../../domain/ports/use-cases/items/get-item-use-case'
import { Item } from '../../../../domain/entitites/item'
import { GetByIdClientUseCase } from '../../../../domain/ports/use-cases/clients/get-by-id-client-use-case'

export class CreateOrderController implements Controller {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly getItemUseCase: GetItemUseCase,
    private readonly getByIdClientUseCase: GetByIdClientUseCase 
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

    const items = await this.processItems(result.data.items, reply)

    const clientExists = await this.getByIdClientUseCase.execute(result.data.clientId)

    const order = await this.createOrderUseCase.execute(
      items,
      clientExists?.id ?? undefined,
    )
    return reply.status(201).send({
      message: 'Order created successfully!',
      orderId: order.id,
      total: order.total,
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

  private async processItems(items: any[], reply: FastifyReply): Promise<Item[]> {
    return await Promise.all(items.map(async (item) => {
      const itemDetails = await this.getItemUseCase.getById(item.itemId);
      if (!itemDetails) {
        return reply.status(400).send({
          message: `Item identifier ${item.itemId} is invalid!`,
        })
      }
      itemDetails.quantity = item.quantity;
      return itemDetails;
    }))
  }
}
