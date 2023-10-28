import { Order } from "../../../../entitites/order";
import { Payment } from "../../../../entitites/payment";

export interface ConfirmOrderPaymentUseCase {
  execute(payment: Payment, order: Order): Promise<void>
}
