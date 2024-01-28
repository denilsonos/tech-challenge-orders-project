import { FindItemParams } from "../../adapters/gateways/dtos/find-item-params";
import { ItemRepository } from "../../adapters/gateways/repositories/item-repository";
import { ItemUseCase } from "../../adapters/gateways/use-cases/item-use-case";
import { ItemDAO } from "../../base/dao/item";
import { ItemDTO } from "../../base/dto/item";
import { NotFoundException } from "../entities/exceptions";
import { ItemEntity } from "../entities/item";
import { Item } from "../entities/item-orm";

export class ItemUseCaseImpl implements ItemUseCase {
  constructor(private readonly itemRepository: ItemRepository) { }

  public async create(params: ItemDTO): Promise<ItemEntity> {
    const newItem = new Item(
      params.name,
      params.description,
      params.category,
      params.value,
      params.image!
    );
    
    const itemCreated = await this.itemRepository.save(newItem);
    return ItemDAO.daoToEntity(itemCreated);
  }

  public async getById(itemId: number): Promise<ItemEntity> {
    const item: ItemDAO | null = await this.itemRepository.getById(itemId)
    if (!item) {
      throw new NotFoundException('Item not found!')
    }
    return ItemDAO.daoToEntity(item);
  }

  public async findByParams(params: FindItemParams): Promise<ItemEntity[] | []> {
    const items: ItemDAO[] | null = await this.itemRepository.findByParams(params)
    return ItemDAO.daosToEntities(items);
  }

  public async delete(itemId: number): Promise<void> {
    const item = await this.itemRepository.getById(itemId)
    if (!item) {
      throw new NotFoundException('Item not found!')
    }
    await this.itemRepository.deleteById(itemId)
  }

  public async update(itemId: number, params: ItemDTO): Promise<void> {
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
      image
    })
  }
}
