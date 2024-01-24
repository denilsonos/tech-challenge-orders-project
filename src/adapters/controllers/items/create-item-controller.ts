import { z } from 'zod'
import { ItemUseCase } from '../../gateways/use-cases/item-use-case'
import { Controller } from '../../gateways/controllers/controller'
import { ItemCategory } from '../validators/enums/item-category'
import { isBase64 } from '../validators/base64-validator'
import { BadRequestException } from '../../../core/entities/exceptions'

export class CreateItemController implements Controller {
  constructor(private readonly itemUseCase: ItemUseCase) { }

  public async execute(body: unknown): Promise<number> {
    const result = this.validate(body)
    if (!result.success) {
      throw new BadRequestException('Validation error!', result.error.issues)
    }

    const item = await this.itemUseCase.create(result.data)
    return item.id!
  }

  private validate(body: unknown) {
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