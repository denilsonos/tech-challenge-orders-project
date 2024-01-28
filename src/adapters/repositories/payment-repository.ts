import { DataSource } from 'typeorm'
import { PaymentRepository } from '../gateways/repositories/payment-repository'
import { Payment } from '../../core/entities/payment'
import { PaymentStatus } from '../../core/entities/enums/payment-status'
export class PaymentRepositoryImpl implements PaymentRepository {
  constructor(private readonly database: DataSource) { }

  async save(payment: Payment): Promise<Payment> {
    const repository = this.database.getRepository(Payment)
    return await repository.save(payment)
  }

  async getById(paymentId: number): Promise<Payment | null> {
    const repository = this.database.getRepository(Payment)
    return await repository.findOne({ where: { id: paymentId }, relations: ['order', 'order.items'] })
  }

  async update(paymentId: number, params: { status: PaymentStatus }): Promise<void> {
    const repository = this.database.getRepository(Payment)
    await repository.update(paymentId, params)
  }
}
