import { Controller } from '../../gateways/controllers/controller'
import { validateId } from '../validators/identifier-validator'
import { BadRequestException } from '../../../core/entities/exceptions'
import { ItemUseCase } from '../../gateways/use-cases/item-use-case'
import { ItemEntity } from '../../../core/entities/item'

export class GetItemController implements Controller {
  constructor(private readonly itemUseCase: ItemUseCase) { }

  public async execute(params: unknown): Promise<ItemEntity> {
    const result = validateId(params)
    if (!result.success) {
      throw new BadRequestException('Validation error!', result.error.issues)
    }

    const item = await this.itemUseCase.getById(Number(result.data.id))
    return item
  }
}
