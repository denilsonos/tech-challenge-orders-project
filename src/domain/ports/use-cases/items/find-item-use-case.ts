import { FindItemParams } from '../../../dtos/find-item-params'
import { Item } from '../../../entitites/item'

export interface FindItemUseCase {
  findByParams(params: FindItemParams): Promise<Item[] | []>
}
