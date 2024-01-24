import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { Controller } from '../../gateways/controllers/controller'
import { ItemUseCase } from '../../gateways/use-cases/item-use-case'
import { ItemCategory } from '../validators/enums/item-category'
import { isBase64 } from '../validators/base64-validator'
import { nonemptyObject } from '../validators/nonempty-object-validator'
import { validateId } from '../validators/identifier-validator'
import { BadRequestException } from '../../../core/entities/exceptions'

export class UpdateItemController implements Controller {
  constructor(private readonly itemUseCase: ItemUseCase) { }

  public async execute(params: unknown, body: unknown): Promise<any> {
    const result = this.validate(params, body)

    if (!result.params.success) {
      throw new BadRequestException('Validation error!', result.params.error.issues)
    }

    if (!result.body.success) {
      throw new BadRequestException('Validation error!', result.body.error.issues)
    }

    await this.itemUseCase.update(Number(result.params.data.id), result.body.data)
  }

  private validate(params: unknown, body: unknown) {
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
