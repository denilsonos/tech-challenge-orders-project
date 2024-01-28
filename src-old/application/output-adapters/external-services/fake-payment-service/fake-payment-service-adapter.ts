import { Order } from "../../../../domain/entitites/order";
import QRCode from 'qrcode'
import { PaymentServiceAdapter } from "../payment-service-adapter";


export class FakePaymentServiceAdapter implements PaymentServiceAdapter{

  public async create(order: Order): Promise<string> {
    const valueBrl = order.total.toLocaleString('pr-BR', {
      style: 'currency',
      currency: 'BRL'
    })
    return await QRCode.toDataURL(valueBrl)
  }
}