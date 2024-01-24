import { Item } from '../../../entitites/item'

export interface CreateItemUseCase {
  execute(
    name: string,
    description: string,
    category: string,
    value: number,
    image: string,
  ): Promise<Item>
}
