import { OrderRepository } from "../../../adapters/gateways/repositories/order-repository"
import { CreateOrderUseCase } from "../../../adapters/gateways/use-cases/orders/create-order-use-case"
import { ItemDAO } from "../../../base/dao/item"
import { OrderDAO } from "../../../base/dao/order"
import { ItemDTO } from "../../../base/dto/item"
import { OrderEntity } from "../../entities/order"



export class CreateOrderUseCaseImpl implements CreateOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) { }

  public async execute(items: ItemDTO[], clientId?: number): Promise<OrderDAO> {
    const order = new OrderDAO()
    order.clientId = clientId;
    order.items = items.map(item => {
      const itemDao = new ItemDAO()
      itemDao.name = item.name
      itemDao.description = item.description
      itemDao.category = item.category
      itemDao.value = item.value
      itemDao.quantity = item.quantity!
      itemDao.image = item.image!

      return itemDao;
    })
    return await this.orderRepository.save(order)
  }
}
