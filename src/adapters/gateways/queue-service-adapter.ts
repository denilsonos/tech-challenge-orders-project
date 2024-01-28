import { Order } from "../../core/entities/order"

export interface QueueServiceAdapter {
  toqueue(order: Order): Promise<void>
  dequeue(order: Order): Promise<void>
}