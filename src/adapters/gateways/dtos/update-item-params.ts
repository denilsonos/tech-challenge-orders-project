import { ItemCategory } from "../../application/input-adapters/enums/item-category";

export type UpdateItemParams = {
  name?: string,
  description?: string,
  category?: ItemCategory,
  value?: number,
  image?: Buffer,
}