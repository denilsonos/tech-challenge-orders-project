import { UpdateItemParams } from '../../../dtos/update-item-params'

export interface UpdateItemUseCase {
  update(itemId: number, params: UpdateItemParams): Promise<void>
}
