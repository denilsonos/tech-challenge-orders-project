import { DataSource } from 'typeorm'
import { ItemRepository } from '../gateways/repositories/item-repository'
import { FindItemParams } from '../gateways/dtos/find-item-params'
import { ItemDTO } from '../../base/dto/item'
import { ItemDAO } from '../../base/dao/item'

export class ItemRepositoryImpl implements ItemRepository {
  constructor(private readonly database: DataSource) { }

  async save(item: ItemDAO): Promise<ItemDAO> {
    const repository = this.database.getRepository(ItemDAO)
    return await repository.save(item)
  }

  async getById(itemId: number): Promise<ItemDAO | null> {
    const repository = this.database.getRepository(ItemDAO)
    return await repository.findOneBy({ id: itemId })
  }

  async findByParams(params: FindItemParams): Promise<ItemDAO[] | []> {
    const repository = this.database.getRepository(ItemDAO)
    return await repository.find({ where: params })
  }

  async update(itemId: number, params: ItemDTO): Promise<void> {
    const repository = this.database.getRepository(ItemDAO)
    await repository.update(itemId, params)
  }

  async deleteById(itemId: number): Promise<void> {
    const repository = this.database.getRepository(ItemDAO)
    await repository.delete({ id: itemId })
  }
}
