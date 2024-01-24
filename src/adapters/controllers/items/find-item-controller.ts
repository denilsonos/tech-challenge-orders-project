import { FastifyReply, FastifyRequest } from 'fastify'
import { Controller } from '../../../../domain/ports/controllers/controller'
import { z } from 'zod'
import { FindItemUseCase } from '../../../../domain/ports/use-cases/items/find-item-use-case'
import { ItemCategory } from '../../enums/item-category'

export class FindItemController implements Controller {
  constructor(private readonly findItemUseCase: FindItemUseCase) { }

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
    const items = await this.findItemUseCase.findByParams(result.data)
    return reply.status(200).send({
      message: `${items.length} items found!`,
      items: items.map((item) => item.fromEntity()),
    })
  }

  private validate(params: FastifyRequest['query']) {
    const schema = z.object({
      category: z.nativeEnum(ItemCategory).optional()
    })
    return schema.safeParse(params)
  }
}
