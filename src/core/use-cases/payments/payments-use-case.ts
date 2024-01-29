import { PaymentServiceAdapter } from "../../../adapters/gateways/payment-service-adapter";
import { QueueServiceAdapter } from "../../../adapters/gateways/queue-service-adapter";
import { OrderRepository } from "../../../adapters/gateways/repositories/order-repository";
import { PaymentRepository } from "../../../adapters/gateways/repositories/payment-repository";
import { PaymentsUseCase } from "../../../adapters/gateways/use-cases/payments-use-case";
import { PaymentDAO } from "../../../base/dao/payment";
import { OrderDTO } from "../../../base/dto/order";
import { PaymentDTO } from "../../../base/dto/payment";
import { OrderStatus } from "../../entities/enums/order-status";
import { PaymentStatus } from "../../entities/enums/payment-status";
import { PaymentEntity } from "../../entities/payment";

export class PaymentsCaseImpl implements PaymentsUseCase {

    constructor(private readonly paymentRepository: PaymentRepository,
        private readonly orderRespository: OrderRepository,
        private readonly queueService: QueueServiceAdapter,
        private readonly paymentService: PaymentServiceAdapter) { }

    public async confirmOrderPayment(payment: PaymentDTO, order: OrderDTO): Promise<void> {
        await this.paymentRepository.update(payment.id!, {
            status: PaymentStatus.Confirmed,
        })

        await this.queueService.toqueue(order)
    }

    public async createOrderPayment(order: OrderDTO): Promise<PaymentEntity | any> {
        try {
            const qrCodeImage = await this.paymentService.create(order)
            const payment = new PaymentDAO()
            order.status = OrderStatus.PendingPayment
            payment.value = order.total
            console.log("payment.value: ", payment.value, order.total)
            payment.status = order.status
            if (order.id) payment.orderId = order.id
            payment.qrCode = Buffer.from(qrCodeImage)
            await this.orderRespository.update(order.id!, order.status)
            console.log("payment: ", payment)
            const paymentDAO = await this.paymentRepository.save(payment)
            const newPaymentDAO = await this.paymentRepository.getById(paymentDAO.id!)

            console.log("paymentDAO: ", paymentDAO)
            const response = newPaymentDAO?.daoToEntity()
            console.log("response: ", response)
            return response    
        } catch (error) {
            console.log(error)
        }
        
    }

    public async getById(paymentId: number): Promise<PaymentEntity | undefined> {
        const paymentDAO = await this.paymentRepository.getById(paymentId)
        return paymentDAO?.daoToEntity()
    }
}