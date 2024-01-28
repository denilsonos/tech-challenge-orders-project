import { PaymentRepository } from "../../../adapters/gateways/repositories/payment-repository";
import { GetOrderPaymentUseCase } from "../../../adapters/gateways/use-cases/payments/get-order-payment-use-case";
import { PaymentEntity } from "../../entities/payment";

export class GetOrderPaymentUseCaseImpl implements GetOrderPaymentUseCase {
  constructor(private readonly paymentRepository: PaymentRepository) { }

  public async getById(paymentId: number): Promise<PaymentEntity | null> {
    return await this.paymentRepository.getById(paymentId)
  }
}
