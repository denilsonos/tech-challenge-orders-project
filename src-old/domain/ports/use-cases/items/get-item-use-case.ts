import { Item } from '../../../entitites/item'

export interface GetItemUseCase {
  getById(itemId: number): Promise<Item | null>
}
