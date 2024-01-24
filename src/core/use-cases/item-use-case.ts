import { FindItemParams } from "../../adapters/gateways/dtos/find-item-params";
import { ItemParams } from "../../adapters/gateways/dtos/item-params";
import { UpdateItemParams } from "../../adapters/gateways/dtos/update-item-params";
import { ItemRepository } from "../../adapters/gateways/repositories/item-repository";
import { ItemUseCase } from "../../adapters/gateways/use-cases/item-use-case";
import { NotFoundException } from "../entities/exceptions";
import { Item, ItemEntity } from "../entities/item";

export class ItemUseCaseImpl implements ItemUseCase {
  constructor(private readonly itemRepository: ItemRepository) { }

  public async create(params: ItemParams): Promise<Item> {
    const item = new Item()
    item.toEntity(params)
    return await this.itemRepository.save(item)
  }

  public async getById(itemId: number): Promise<ItemEntity> {
    const item = await this.itemRepository.getById(itemId)
    if (!item) {
      throw new NotFoundException('Item not found!')
    }
    return item.fromEntity()
  }

  public async findByParams(params: FindItemParams): Promise<ItemEntity[] | []> {
    const items = await this.itemRepository.findByParams(params)
    return items.map((item) => item.fromEntity())
  }

  public async delete(itemId: number): Promise<void> {
    const item = await this.itemRepository.getById(itemId)
    if (!item) {
      throw new NotFoundException('Item not found!')
    }
    await this.itemRepository.deleteById(itemId)
  }

  public async update(itemId: number, params: UpdateItemParams): Promise<void> {
    const item = await this.itemRepository.getById(itemId)
    if (!item) {
      throw new NotFoundException('Item not found!')
    }

    const { name, description, category, value, image } = params;
    await this.itemRepository.update(itemId, {
      name,
      description,
      category,
      value,
      image: image ? Buffer.from(image as string, 'base64') : undefined
    })
  }
}
