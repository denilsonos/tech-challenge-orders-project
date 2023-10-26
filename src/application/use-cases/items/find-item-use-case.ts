import { FindItemParams } from '../../../domain/dtos/find-item-params'
import { Item } from '../../../domain/entitites/item'
import { ItemRepository } from '../../../domain/ports/repositories/item-repository'
import { FindItemUseCase } from '../../../domain/ports/use-cases/items/find-item-use-case'

export class FindItemUseCaseImpl implements FindItemUseCase {
  constructor(private readonly itemRepository: ItemRepository) { }

  public async findByParams(params: FindItemParams): Promise<Item[] | []> {
    return await this.itemRepository.findByParams(params)
  }
}
