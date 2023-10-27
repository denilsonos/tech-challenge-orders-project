import { DataSource } from 'typeorm'
import { PaymentRepository } from '../../../domain/ports/repositories/payment-repository'
import { Payment } from '../../../domain/entitites/payment'

export class PaymentRepositoryImpl implements PaymentRepository {
  constructor(private readonly database: DataSource) { }

  async save(payment: Payment): Promise<Payment> {
    const repository = this.database.getRepository(Payment)
    return await repository.save(payment)
  }
}
