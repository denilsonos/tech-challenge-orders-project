import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { confirmOrderPaymentSwagger } from '../../../../output-adapters/swagger'
import { SingletonOrmDatabaseAdapter } from '../../../../../../src/frameworks/database/mysql-orm-adapter'
import { PaymentRepositoryImpl } from '../../../../output-adapters/repositories/payment-repository'
import { GetOrderPaymentUseCaseImpl } from '../../../../use-cases/orders/payments/get-order-payment-use-case'
import { ConfirmOrderPaymentUseCaseImpl } from '../../../../use-cases/orders/payments/confirm-order-payment-use-case'
import { FakeQueueServiceAdapter } from '../../../../output-adapters/external-services/fake-queue-service/fake-queue-service-adapter'
import { ConfirmOrderPaymentController } from '../../../controllers/orders/payments/confirm-order-payment-controller'
import { GetOrderUseCaseImpl } from '../../../../use-cases/orders/get-order-use-case'
import { OrderRepositoryImpl } from '../../../../output-adapters/repositories/order-repository'

export const confirmOrderPaymentRoute = async (fastify: FastifyInstance) => {
  fastify.post(
    '/orders/payments/confirm',
    confirmOrderPaymentSwagger(),
    async (request: FastifyRequest, reply: FastifyReply) => {
      const orm = SingletonOrmDatabaseAdapter.getInstance()
      const queueService = new FakeQueueServiceAdapter(orm.database)
      const orderRepository = new OrderRepositoryImpl(orm.database)
      const paymentRepository = new PaymentRepositoryImpl(orm.database)
      const getOrderPaymentUseCase = new GetOrderPaymentUseCaseImpl(paymentRepository)
      const getOrderUseCase = new GetOrderUseCaseImpl(orderRepository)
      const confirmOrderPaymentUseCase = new ConfirmOrderPaymentUseCaseImpl(paymentRepository, queueService)
      const controller = new ConfirmOrderPaymentController(
        getOrderPaymentUseCase,
        getOrderUseCase,
        confirmOrderPaymentUseCase,
      )
      await controller.execute(request, reply)
    },
  )
}
