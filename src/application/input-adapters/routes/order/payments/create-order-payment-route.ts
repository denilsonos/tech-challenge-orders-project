import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { createOrderPaymentSwagger } from '../../../../output-adapters/swagger'
import { SingletonOrmDatabaseAdapter } from '../../../../../infrastructure/adapters/orm-adapter/singleton-orm-database-adapter'
import { OrderRepositoryImpl } from '../../../../output-adapters/repositories/order-repository'
import { PaymentRepositoryImpl } from '../../../../output-adapters/repositories/payment-repository'
import { CreateOrderPaymentUseCaseImpl } from '../../../../use-cases/orders/payments/create-order-payment-use-case'
import { FakePaymentServiceAdapter } from '../../../../output-adapters/external-services/fake-payment-service/fake-payment-service-adapter'
import { GetOrderUseCaseImpl } from '../../../../use-cases/orders/get-order-use-case'
import { CreateOrderPaymentController } from '../../../controllers/orders/payments/create-order-payment-controller'

export const createOrderPaymentRoute = async (fastify: FastifyInstance) => {
  fastify.post(
    '/orders/payments',
    createOrderPaymentSwagger(),
    async (request: FastifyRequest, reply: FastifyReply) => {
      const orm = SingletonOrmDatabaseAdapter.getInstance()
      const orderRepository = new OrderRepositoryImpl(orm.database)
      const paymentRepository = new PaymentRepositoryImpl(orm.database)
      const paymentService = new FakePaymentServiceAdapter()
      const createOrderPaymentUseCase = new CreateOrderPaymentUseCaseImpl(
        paymentRepository,
        paymentService,
        orderRepository,
      )
      const getOrderUseCase = new GetOrderUseCaseImpl(orderRepository)
      const controller = new CreateOrderPaymentController(
        getOrderUseCase,
        createOrderPaymentUseCase,
      )
      await controller.execute(request, reply)
    },
  )
}
