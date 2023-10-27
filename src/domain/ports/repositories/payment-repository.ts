import { Payment } from "../../entitites/payment";

export interface PaymentRepository {
  save(payment: Payment): Promise<Payment>
}
