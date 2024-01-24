import { Payment } from "../../entitites/payment";
import { PaymentStatus } from "../../enums/payment-status";

export interface PaymentRepository {
  save(payment: Payment): Promise<Payment>
  getById(paymentId: number): Promise<Payment | null>
  update(paymentId: number, params: { status: PaymentStatus }): Promise<void>
}
