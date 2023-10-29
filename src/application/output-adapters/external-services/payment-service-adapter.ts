import { Order } from "../../../domain/entitites/order";

export interface PaymentServiceAdapter {
  create(order: Order): Promise<string>
}