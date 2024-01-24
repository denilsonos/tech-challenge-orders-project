import { Order } from "../../../domain/entitites/order";

export interface QueueServiceAdapter {
  toqueue(order: Order): Promise<void>
  dequeue(order: Order): Promise<void>
}