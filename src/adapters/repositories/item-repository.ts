import { DataSource } from 'typeorm'
import { ItemRepository } from '../gateways/repositories/item-repository'
import { Item } from '../../core/entities/item'
import { FindItemParams } from '../gateways/dtos/find-item-params'
import { UpdateItemParams } from '../gateways/dtos/update-item-params'

export class ItemRepositoryImpl implements ItemRepository {
  constructor(private readonly database: DataSource) { }

  async save(item: Item): Promise<Item> {
    const repository = this.database.getRepository(Item)
    return await repository.save(item)
  }

  async getById(itemId: number): Promise<Item | null> {
    const repository = this.database.getRepository(Item)
    return await repository.findOneBy({ id: itemId })
  }

  async findByParams(params: FindItemParams): Promise<Item[] | []> {
    const repository = this.database.getRepository(Item)
    return await repository.find({ where: params })
  }

  async update(itemId: number, params: UpdateItemParams & { image?: Buffer}): Promise<void> {
    const repository = this.database.getRepository(Item)
    await repository.update(itemId, params)
  }

  async deleteById(itemId: number): Promise<void> {
    const repository = this.database.getRepository(Item)
    await repository.delete({ id: itemId })
  }
}
