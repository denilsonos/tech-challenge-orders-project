import { ItemRepository } from '../../../domain/ports/repositories/item-repository'
import { DeleteItemUseCase } from '../../../domain/ports/use-cases/items/delete-item-use-case'

export class DeleteItemUseCaseImpl implements DeleteItemUseCase {
  constructor(private readonly itemRepository: ItemRepository) { }

  public async delete(itemId: number): Promise<void> {
    await this.itemRepository.deleteById(itemId)
  }
}
