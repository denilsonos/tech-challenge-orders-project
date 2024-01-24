import { Item } from "../../../core/entities/item"
import { FindItemParams } from "../dtos/find-item-params"
import { UpdateItemParams } from "../dtos/update-item-params"

export interface ItemRepository {
  save(order: Item): Promise<Item>
  getById(itemId: number): Promise<Item | null>
  findByParams(params: FindItemParams): Promise<Item[] | []>
  update(itemId: number, params: UpdateItemParams & { image?: Buffer }): Promise<void>
  deleteById(itemId: number): Promise<void>
}
