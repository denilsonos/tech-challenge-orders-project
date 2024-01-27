import { Payment } from "../../../../entitites/payment";

export interface GetOrderPaymentUseCase {
  getById(paymentId: number): Promise<Payment | null>
}
