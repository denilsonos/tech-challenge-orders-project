import { FastifyReply, FastifyRequest } from 'fastify'
import { Controller } from '../../../../domain/ports/controllers/controller'
import { z } from 'zod'
import { CreateItemUseCase } from '../../../../domain/ports/use-cases/items/create-item-use-case'
import { ItemCategory } from '../../enums/item-category'
import { isBase64 } from '../../commons/validators/base64-validator'

export class CreateItemController implements Controller {
  constructor(private readonly createItemUseCase: CreateItemUseCase) { }

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
    const item = await this.createItemUseCase.execute(
      result.data.name,
      result.data.description,
      result.data.category,
      result.data.value,
      result.data.image,
    )
    return reply.status(201).send({
      message: 'Item created successfully!',
      itemId: item.id,
    })
  }

  private validate(body: FastifyRequest['body']) {
    const schema = z.object({
      name: z.string(),
      description: z.string(),
      category: z.nativeEnum(ItemCategory),
      value: z.number(),
      image: z.string().refine(value => isBase64(value), {
        message: 'Invalid base64 format',
      }),
    })
    return schema.safeParse(body)
  }
}