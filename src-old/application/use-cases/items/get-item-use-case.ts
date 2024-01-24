import { Item } from '../../../domain/entitites/item'
import { ItemRepository } from '../../../domain/ports/repositories/item-repository'
import { GetItemUseCase } from '../../../domain/ports/use-cases/items/get-item-use-case'

export class GetItemUseCaseImpl implements GetItemUseCase {
  constructor(private readonly itemRepository: ItemRepository) {}

  public async getById(itemId: number): Promise<Item | null> {
    return await this.itemRepository.getById(itemId)
  }
}
