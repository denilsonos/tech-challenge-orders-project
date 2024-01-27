
import { Payment } from './payment'
import  {FakeQueue } from "../../adapters/external-services/fake-queue-service/fake-queue-service-adapter"
import { ItemEntity } from './item'

export class OrderEntity {
  public id?: number

  public status!: string

  public clientId: number | undefined

  public total!: number

  public createdAt!: Date;

  public updatedAt!: Date;

  public items?: ItemEntity[]

  public payment?: Payment

  public queue?: FakeQueue

  constructor() { }

  private calculateTotal(items: ItemEntity[]): number {
    return items.reduce((total, item) => {
      return total + item.quantity! * Number(item.value)
    }, 0)
  }
}
