import { ItemDTO } from "../../../base/dto/item";
import { ItemEntity } from "../../../core/entities/item";
import { FindItemParams } from "../dtos/find-item-params";

export interface ItemUseCase {
  create(params: ItemDTO): Promise<ItemEntity>
  delete(itemId: number): Promise<void>
  findByParams(params: FindItemParams): Promise<ItemEntity[] | []>
  getById(itemId: number): Promise<ItemEntity>
  update(itemId: number, params: ItemDTO): Promise<void>
}
