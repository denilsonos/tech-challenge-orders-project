import { FindItemParams } from "../../../adapters/gateways/dtos/find-item-params";
import { UpdateItemParams } from "../../../adapters/gateways/dtos/update-item-params";
import { ItemRepository } from "../../../adapters/gateways/repositories/item-repository";
import { ItemUseCase } from "../../../adapters/gateways/use-cases/item-use-case";
import { NotFoundException } from "../../entities/exceptions";
import { Item } from "../../entities/item";


export class ItemUseCaseImpl implements ItemUseCase {
  constructor(private readonly itemRepository: ItemRepository) { }

  public async create(
    name: string,
    description: string,
    category: string,
    value: number,
    image: string,
  ): Promise<Item> {
    const item = new Item()
    item.toEntity({ name, description, category, value, image })
    return await this.itemRepository.save(item)
  }

  public async getById(itemId: number): Promise<Item | null> {
    return await this.itemRepository.getById(itemId)
  }

  public async findByParams(params: FindItemParams): Promise<Item[] | []> {
    return await this.itemRepository.findByParams(params)
  }

  public async delete(itemId: number): Promise<void> {
    const item = await this.itemRepository.getById(itemId)
    if (!item) {
      throw new NotFoundException('Item not found!')
    }
    await this.itemRepository.deleteById(itemId)
  }

  public async update(itemId: number, params: UpdateItemParams): Promise<void> {
    await this.itemRepository.update(itemId, params)
  }
}
