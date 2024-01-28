import { Order } from "../../core/entities/order";

export interface PaymentServiceAdapter {
  create(order: Order): Promise<string>
}