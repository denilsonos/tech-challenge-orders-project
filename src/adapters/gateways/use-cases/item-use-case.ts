import { Item } from "../../../core/entities/item";
import { FindItemParams } from "../dtos/find-item-params";
import { UpdateItemParams } from "../dtos/update-item-params";

export interface ItemUseCase {
  create(
    name: string,
    description: string,
    category: string,
    value: number,
    image: string,
  ): Promise<Item>
  delete(itemId: number): Promise<void>
  findByParams(params: FindItemParams): Promise<Item[] | []>
  getById(itemId: number): Promise<Item | null>
  update(itemId: number, params: UpdateItemParams): Promise<void>
}
