import { Order } from "../../../../entitites/order";
import { Payment } from "../../../../entitites/payment";

export interface CreateOrderPaymentUseCase {
  execute(order: Order): Promise<Payment>
}
