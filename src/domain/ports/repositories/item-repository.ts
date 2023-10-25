import { Item } from '../../entitites/item'

export interface ItemRepository {
  save(order: Item): Promise<Item>
  getById(itemId: number): Promise<Item | null>
}
