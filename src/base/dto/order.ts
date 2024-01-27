import { FakeQueue } from "../../adapters/external-services/fake-queue-service/fake-queue-service-adapter";
import { OrderStatus } from "../../core/entities/enums/order-status";
import { OrderEntity } from "../../core/entities/order";
import { Payment } from "../../core/entities/payment";
import { ItemDTO } from "./item";

export class OrderDTO {
  public id?: number

  public status!: string

  public clientId: number | undefined

  public total!: number

  public createdAt!: Date;

  public updatedAt!: Date;

  public items?: ItemDTO[]

  public payment?: Payment

  public queue?: FakeQueue

  constructor() { }

  public toEntity(items: ItemDTO[], clientId?: number): void {
    this.items = items
    this.clientId = clientId
    this.status = OrderStatus.Created
    this.total = this.calculateTotalDTO(items)
  }

  //TODO: alterar items 
  public fromEntity(): OrderEntity {
    return {
      id: this.id!,
      status: this.status,
      clientId: this.clientId,
      total: this.total,
      items: this.items!.map((item) => item.fromEntity()),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }

  private calculateTotalDTO(items: ItemDTO[]): number {
    return items.reduce((total, item) => {
      return total + item.quantity! * Number(item.value)
    }, 0)
  }
}