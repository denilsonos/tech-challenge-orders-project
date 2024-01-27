import { DataSource } from "typeorm";
import { ClientDTO } from "../../../base/dto/client";
import { Order } from "../../gateways/controllers/order";
import { z } from "zod";
import { BadRequestException } from "../../../core/entities/exceptions";
import { OrderRepository } from "../../gateways/repositories/order-repository";
import { OrderUseCase } from "../../gateways/use-cases/order-use-case";
import { OrderRepositoryImpl } from "../../repositories/order-repository";
import { OrderUseCaseImpl } from "../../../core/use-cases/orders/order-use-case";
import { FakeQueue, FakeQueueServiceAdapter } from "../../external-services/fake-queue-service/fake-queue-service-adapter";
import { QueueServiceAdapter } from "../../gateways/queue-service-adapter";
import { OrderDTO } from "../../../base/dto/order";
import { OrderStatus } from "../../../../src-old/domain/enums/order-status";
import { ItemUseCaseImpl } from "../../../core/use-cases/item-use-case";
import { ItemRepositoryImpl } from "../../repositories/item-repository";
import { ItemRepository } from "../../gateways/repositories/item-repository";
import { ItemUseCase } from "../../gateways/use-cases/item-use-case";
import { ItemDTO, ItemOrderDTO } from "../../../base/dto/item";
import { ItemPresenter } from "../../presenters/item";
import { OrderPresenter } from "../../presenters/order";

export class OrderController implements Order {
  private orderUseCase: OrderUseCase;
  private orderRepository: OrderRepository;
  private itemRepository: ItemRepository
  private itemUseCase : ItemUseCase
  private queueService : QueueServiceAdapter

  constructor(readonly database: DataSource) { 
    this.orderRepository = new OrderRepositoryImpl(database)
    this.queueService = new FakeQueueServiceAdapter(database)
    this.itemRepository = new ItemRepositoryImpl(database)
    this.itemUseCase = new ItemUseCaseImpl(this.itemRepository)
    this.orderUseCase = new OrderUseCaseImpl(this.orderRepository, this.queueService)
  }

  async create(bodyParams: unknown): Promise<OrderDTO> {
    const schema = z.object({
      items: z
        .array(
          z.object({
            itemId: z.number(),
            quantity: z.number(),
          }),
        )
        .nonempty(),
      clientId: z.number().optional(),
    })

    const result = schema.safeParse(bodyParams)

    if (!result.success) {
      throw new BadRequestException('Validation error!', result.error.issues)
    }

    const now = new Date()
    const {items, clientId} = result.data
    const itemFormatted = this.getItems(items)
    const itemsOrder = await this.itemUseCase.getAllByIds(itemFormatted)

    const orderToCreate = new OrderDTO(OrderStatus.Created, clientId, 0, now, now,
       ItemPresenter.EntitiesToDto(itemsOrder))      
    
    const orderCreated = await this.orderUseCase.create(orderToCreate)

    return OrderPresenter.EntityToDto(orderCreated)
  }

  async find(): Promise<OrderDTO[]> {
    throw new Error("Method not implemented.");
  }

  async get(identifier: any): Promise<OrderDTO> {
    throw new Error("Method not implemented.");
  }

  async update(identifier: any): Promise<OrderDTO> {
    throw new Error("Method not implemented.");
  }

  private getItems(items: any[]){
    const listItemIds: ItemOrderDTO[] = [];

    items.forEach(item => {
      listItemIds.push(new ItemOrderDTO(item.itemId, item.quantity))
    });

    return listItemIds
  }
}