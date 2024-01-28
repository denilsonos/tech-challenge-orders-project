import { DataSource } from 'typeorm'
import { PaymentRepository } from '../gateways/repositories/payment-repository'
import { PaymentStatus } from '../../core/entities/enums/payment-status'
import { PaymentDAO } from '../../base/dao/payment'
export class PaymentRepositoryImpl implements PaymentRepository {
  constructor(private readonly database: DataSource) {}

  async save(payment: PaymentDAO): Promise<PaymentDAO> {
    const repository = this.database.getRepository(PaymentDAO)
    return await repository.save(payment)
  }

  async getById(paymentId: number): Promise<PaymentDAO | null> {
    const repository = this.database.getRepository(PaymentDAO)
    return await repository.findOne({
      where: { id: paymentId },
      relations: ['order', 'order.items'],
    })
  }

  async update(
    paymentId: number,
    params: { status: PaymentStatus },
  ): Promise<void> {
    const repository = this.database.getRepository(PaymentDAO)
    await repository.update(paymentId, params)
  }
}
