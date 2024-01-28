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

  constructor(status: string, clientId: number | undefined, total: number, createdAt: Date, updatedAt: Date, items: ItemDTO[], id?: number) { }

  public toEntity(items: ItemDTO[], clientId?: number): void {
    this.items = items
    this.clientId = clientId
    this.status = OrderStatus.Created
    this.total = this.calculateTotalDTO(items)
  }

  public fromEntity(): OrderEntity {
    
    const order = new OrderEntity(
      this.status,
      this.clientId,
      this.total,
      this.createdAt,
      this.updatedAt, 
      this.items!.map((item) => item.fromEntity()),
      this.id
    )
    return order
  }

  private calculateTotalDTO(items: ItemDTO[]): number {
    return items.reduce((total, item) => {
      return total + item.quantity! * Number(item.value)
    }, 0)
  }
}