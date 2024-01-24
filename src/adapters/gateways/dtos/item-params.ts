import { ItemCategory } from "../../controllers/validators/enums/item-category";

export type ItemParams = {
  name: string,
  description: string,
  category: ItemCategory,
  value: number,
  image: string,
}