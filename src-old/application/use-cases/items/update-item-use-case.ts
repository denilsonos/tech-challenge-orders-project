import { UpdateItemParams } from '../../../domain/dtos/update-item-params'
import { ItemRepository } from '../../../domain/ports/repositories/item-repository'
import { UpdateItemUseCase } from '../../../domain/ports/use-cases/items/update-item-use-case'

export class UpdateItemUseCaseImpl implements UpdateItemUseCase {
  constructor(private readonly itemRepository: ItemRepository) { }

  public async update(itemId: number, params: UpdateItemParams): Promise<void> {
    await this.itemRepository.update(itemId, params)
  }
}
