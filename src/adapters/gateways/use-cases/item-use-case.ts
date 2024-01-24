import { Item, ItemEntity } from "../../../core/entities/item";
import { FindItemParams } from "../dtos/find-item-params";
import { ItemParams } from "../dtos/item-params";
import { UpdateItemParams } from "../dtos/update-item-params";

export interface ItemUseCase {
  create(params: ItemParams): Promise<Item>
  delete(itemId: number): Promise<void>
  findByParams(params: FindItemParams): Promise<ItemEntity[] | []>
  getById(itemId: number): Promise<ItemEntity>
  update(itemId: number, params: UpdateItemParams): Promise<void>
}
