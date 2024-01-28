import { PaymentDTO } from '../../base/dto/payment'
import { PaymentEntity } from '../../core/entities/payment'

export class PaymentPresenter {
  static EntityToDto(paymentEntity: PaymentEntity): PaymentDTO {
    return new PaymentDTO(
      paymentEntity.qrCode,
      paymentEntity.value,
      paymentEntity.status,
      paymentEntity.createdAt,
      paymentEntity.updatedAt,
      paymentEntity.order,
      paymentEntity.id,
    )
  }

  static EntitiesToDto(paymentEntities: PaymentEntity[]): PaymentDTO[] {
    const listDtos: PaymentDTO[] = []

    paymentEntities.forEach((paymentEntity) => {
      listDtos.push(PaymentPresenter.EntityToDto(paymentEntity))
    })

    return listDtos
  }
}
