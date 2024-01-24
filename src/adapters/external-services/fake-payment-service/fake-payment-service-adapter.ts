import QRCode from 'qrcode'
import { PaymentServiceAdapter } from '../../gateways/payment-service-adapter'
import { Order } from '../../../core/entities/order'

export class FakePaymentServiceAdapter implements PaymentServiceAdapter{

  public async create(order: Order): Promise<string> {
    const valueBrl = order.total.toLocaleString('pr-BR', {
      style: 'currency',
      currency: 'BRL'
    })
    return await QRCode.toDataURL(valueBrl)
  }
}