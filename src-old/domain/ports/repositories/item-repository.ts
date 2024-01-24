import { FindItemParams } from '../../dtos/find-item-params'
import { UpdateItemParams } from '../../dtos/update-item-params'
import { Item } from '../../entitites/item'

export interface ItemRepository {
  save(order: Item): Promise<Item>
  getById(itemId: number): Promise<Item | null>
  findByParams(params: FindItemParams): Promise<Item[] | []>
  update(itemId: number, params: UpdateItemParams): Promise<void>
  deleteById(itemId: number): Promise<void>
}
