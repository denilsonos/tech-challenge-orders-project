import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { SingletonOrmDatabaseAdapter } from '../../../../../src/frameworks/database/mysql-orm-adapter'
import { OrderRepositoryImpl } from '../../../output-adapters/repositories/order-repository'
import { GetOrderUseCaseImpl } from '../../../use-cases/orders/get-order-use-case'
import { GetOrderController } from '../../controllers/orders/get-order-controller'
import { getOrderSwagger } from '../../../output-adapters/swagger'

export const getOrderRoute = async (fastify: FastifyInstance) => {
  fastify.get(
    '/orders/:id',
    getOrderSwagger(),
    async (request: FastifyRequest, reply: FastifyReply) => {
      const orm = SingletonOrmDatabaseAdapter.getInstance()
      const orderRepository = new OrderRepositoryImpl(orm.database)
      const getOrderUseCase = new GetOrderUseCaseImpl(orderRepository)
      const controller = new GetOrderController(getOrderUseCase)
      await controller.execute(request, reply)
    },
  )
}
