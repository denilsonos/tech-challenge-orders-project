import { z } from 'zod'
import { ItemUseCase } from '../../gateways/use-cases/item-use-case'
import { Controller } from '../../gateways/controllers/controller'
import { ItemCategory } from '../validators/enums/item-category'
import { BadRequestException } from '../../../core/entities/exceptions'
import { ItemEntity } from '../../../core/entities/item'

export class FindItemController implements Controller {
  constructor(private readonly itemUseCase: ItemUseCase) { }

  public async execute(query: unknown): Promise<[] | ItemEntity[]> {
    const result = this.validate(query)
    if (!result.success) {
      throw new BadRequestException('Validation error!', result.error.issues)
    }

    const items = await this.itemUseCase.findByParams(result.data)
    return items
  }

  private validate(query: unknown) {
    const schema = z.object({
      category: z.nativeEnum(ItemCategory).optional()
    })
    return schema.safeParse(query)
  }
}
