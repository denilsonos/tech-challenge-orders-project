import { DataSource } from 'typeorm'
import { PaymentRepository } from '../gateways/repositories/payment-repository'
import { PaymentStatus } from '../../core/entities/enums/payment-status'
import { PaymentDAO } from '../../base/dao/payment'
import { DbConnection } from '../gateways/interfaces/db-connection'
export class PaymentRepositoryImpl implements PaymentRepository {
  constructor(private readonly database: DbConnection) {}

  private async init(): Promise<DataSource>{
    return await this.database.getConnection()
  }

  async save(payment: PaymentDAO): Promise<PaymentDAO> {
    const dbConn = await this.init()
    const repository = dbConn.getRepository(PaymentDAO)
    return await repository.save(payment)
  }

  async getById(paymentId: number): Promise<PaymentDAO | null> {
    const dbConn = await this.init()
    const repository = dbConn.getRepository(PaymentDAO)
    return await repository.findOne({
      where: { id: paymentId },
      relations: ['order', 'order.items'],
    })
  }

  async update(
    paymentId: number,
    params: { status: PaymentStatus },
  ): Promise<void> {
    const dbConn = await this.init()
    const repository = dbConn.getRepository(PaymentDAO)
    await repository.update(paymentId, params)
  }
}
