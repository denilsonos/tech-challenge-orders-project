import { PaymentDTO } from '../../../base/dto/payment'
export interface Payment {
  create(payment: PaymentDTO): Promise<PaymentDTO>
  // TODO: Verificar tipagem
  confirm(payment: { paymentId: number; orderId: number }): Promise<void>
  getOrder(identifier: any): Promise<PaymentDTO>
}
