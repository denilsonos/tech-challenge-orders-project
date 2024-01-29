import { DataSource } from 'typeorm'
import { ItemRepository } from '../gateways/repositories/item-repository'
import { FindItemParams } from '../gateways/dtos/find-item-params'
import { ItemDTO } from '../../base/dto/item'
import { ItemDAO } from '../../base/dao/item'
import { DbConnection } from '../gateways/interfaces/db-connection'

export class ItemRepositoryImpl implements ItemRepository {
  constructor(private readonly database: DbConnection) { }

  private async init(): Promise<DataSource>{
    return await this.database.getConnection()
  }
  
  async save(item: ItemDAO): Promise<ItemDAO> {
    const dbConn = await this.init()
    const repository = dbConn.getRepository(ItemDAO)
    return await repository.save(item)
  }

  async getById(itemId: number): Promise<ItemDAO | null> {
    const dbConn = await this.init()
    const repository = dbConn.getRepository(ItemDAO)
    return await repository.findOneBy({ id: itemId })
  }

  async getByName(name: string): Promise<ItemDAO | null> {
    const dbConn = await this.init()
    const repository = dbConn.getRepository(ItemDAO)
    return await repository.findOneBy({ name })
  }

  async findByParams(params: FindItemParams): Promise<ItemDAO[] | []> {
    const dbConn = await this.init()
    const repository = dbConn.getRepository(ItemDAO)
    return await repository.find({ where: params })
  }

  async update(itemId: number, params: ItemDTO): Promise<void> {
    const dbConn = await this.init()
    const repository = dbConn.getRepository(ItemDAO)
    await repository.update(itemId, params)
  }

  async deleteById(itemId: number): Promise<void> {
    const dbConn = await this.init()
    const repository = dbConn.getRepository(ItemDAO)
    await repository.delete({ id: itemId })
  }
}
