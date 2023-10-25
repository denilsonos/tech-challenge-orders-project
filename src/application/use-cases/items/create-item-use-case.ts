import { Item } from '../../../domain/entitites/item'
import { ItemRepository } from '../../../domain/ports/repositories/item-repository'
import { CreateItemUseCase } from '../../../domain/ports/use-cases/items/create-item-use-case'

export class CreateItemUseCaseImpl implements CreateItemUseCase {
  constructor(private readonly itemRepository: ItemRepository) {}

  public async execute(
    name: string,
    description: string,
    category: string,
    value: number,
    image: string,
  ): Promise<Item> {
    const item = new Item()
    item.toEntity({ name, description, category, value, image })
    return await this.itemRepository.save(item)
  }
}
