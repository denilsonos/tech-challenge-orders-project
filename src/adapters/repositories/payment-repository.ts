import { DataSource } from 'typeorm'
import { PaymentRepository } from '../gateways/repositories/payment-repository'
import { PaymentEntity } from '../../core/entities/payment'
import { PaymentStatus } from '../../core/entities/enums/payment-status'
export class PaymentRepositoryImpl implements PaymentRepository {
  constructor(private readonly database: DataSource) { }

  async save(payment: PaymentEntity): Promise<PaymentEntity> {
    const repository = this.database.getRepository(PaymentEntity)
    return await repository.save(payment)
  }

  async getById(paymentId: number): Promise<PaymentEntity | null> {
    const repository = this.database.getRepository(PaymentEntity)
    return await repository.findOne({ where: { id: paymentId }, relations: ['order', 'order.items'] })
  }

  async update(paymentId: number, params: { status: PaymentStatus }): Promise<void> {
    const repository = this.database.getRepository(PaymentEntity)
    await repository.update(paymentId, params)
  }
}
