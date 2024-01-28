import { ItemDAO } from "../../../base/dao/item"
import { ItemDTO } from "../../../base/dto/item"
import { Item } from "../../../core/entities/item-orm"
import { FindItemParams } from "../dtos/find-item-params"
import { UpdateItemParams } from "../dtos/update-item-params"

export interface ItemRepository {
  save(order: Item): Promise<Item>
  getById(itemId: number): Promise<ItemDAO | null>
  findByParams(params: FindItemParams): Promise<ItemDAO[] | []>
  update(itemId: number, params: ItemDTO): Promise<void>
  deleteById(itemId: number): Promise<void>
}
