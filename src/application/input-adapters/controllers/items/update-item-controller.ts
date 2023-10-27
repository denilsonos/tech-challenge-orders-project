import { FastifyReply, FastifyRequest } from 'fastify'
import { Controller } from '../../../../domain/ports/controllers/controller'
import { z } from 'zod'
import { UpdateItemUseCase } from '../../../../domain/ports/use-cases/items/update-item-use-case'
import { isBase64 } from '../../commons/validators/base64-validator'
import { ItemCategory } from '../../enums/item-category'
import { nonemptyObject } from '../../commons/validators/nonempty-object-validator'
import { validateId } from '../../commons/validators/identifier-validator'
import { GetItemUseCase } from '../../../../domain/ports/use-cases/items/get-item-use-case'

export class UpdateItemController implements Controller {
  constructor(private readonly updateItemUseCase: UpdateItemUseCase, private readonly getItemUseCase: GetItemUseCase) { }

  public async execute(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<any> {
    const { params, body } = this.validate(request.params, request.body)

    if (!params.success) {
      return reply.status(400).send({
        message: 'Validation error!',
        issues: params.error.issues,
      })
    }

    if (!body.success) {
      return reply.status(400).send({
        message: 'Validation error!',
        issues: body.error.issues,
      })
    }

    const itemId = Number(params.data.id)
    const item = await this.getItemUseCase.getById(itemId)
    if (!item) {
      return reply.status(404).send({
        message: 'Item not found!',
      })
    }

    await this.updateItemUseCase.update(itemId, {
      name: body.data.name,
      description: body.data.description,
      category: body.data.category,
      value: body.data.value,
      image: body.data.image ? Buffer.from(body.data.image, 'base64') : undefined,
    })

    return reply.status(200).send({
      message: 'Item updated successfully!',
    })
  }

  private validate(params: FastifyRequest['params'], body: FastifyRequest['body']) {
    const bodySchema = z.object({
      name: z.string().optional(),
      description: z.string().optional(),
      category: z.nativeEnum(ItemCategory).optional(),
      value: z.number().optional(),
      image: z.string().refine(value => isBase64(value), {
        message: 'Invalid base64 format',
      }).optional(),
    }).refine(value => nonemptyObject(value), {
      message: 'At least one is required'
    })

    return {
      params: validateId(params),
      body: bodySchema.safeParse(body)
    }
  }
}
