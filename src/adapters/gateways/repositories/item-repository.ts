import { ItemDAO } from "../../../base/dao/item"
import { ItemDTO } from "../../../base/dto/item"
import { FindItemParams } from "../dtos/find-item-params"

export interface ItemRepository {
  save(order: ItemDAO): Promise<ItemDAO>
  getById(itemId: number): Promise<ItemDAO | null>
  findByParams(params: FindItemParams): Promise<ItemDAO[] | []>
  update(itemId: number, params: ItemDTO): Promise<void>
  deleteById(itemId: number): Promise<void>
}
