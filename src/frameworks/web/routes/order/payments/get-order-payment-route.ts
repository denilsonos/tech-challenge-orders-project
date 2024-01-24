import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { getOrderPaymentSwagger } from '../../../../output-adapters/swagger'
import { SingletonOrmDatabaseAdapter } from '../../../../../../src/frameworks/database/mysql-orm-adapter'
import { PaymentRepositoryImpl } from '../../../../output-adapters/repositories/payment-repository'
import { GetOrderPaymentUseCaseImpl } from '../../../../use-cases/orders/payments/get-order-payment-use-case'
import { GetOrderPaymentController } from '../../../controllers/orders/payments/get-order-payment-controller'

export const getOrderPaymentRoute = async (fastify: FastifyInstance) => {
  fastify.get(
    '/orders/payments/:id',
    getOrderPaymentSwagger(),
    async (request: FastifyRequest, reply: FastifyReply) => {
      const orm = SingletonOrmDatabaseAdapter.getInstance()
      const paymentRepository = new PaymentRepositoryImpl(orm.database)
      const getOrderPaymentUseCase = new GetOrderPaymentUseCaseImpl(paymentRepository)
      const controller = new GetOrderPaymentController(getOrderPaymentUseCase)
      await controller.execute(request, reply)
    },
  )
}
