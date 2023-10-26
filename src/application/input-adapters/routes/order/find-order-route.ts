import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { SingletonOrmDatabaseAdapter } from '../../../../infrastructure/adapters/orm-adapter/singleton-orm-database-adapter'
import { OrderRepositoryImpl } from '../../../output-adapters/repositories/order-repository'
import { FindOrderUseCaseImpl } from '../../../use-cases/orders/find-order-use-case'
import { FindOrderController } from '../../controllers/orders/find-order-controller'

export const findOrderRoute = async (fastify: FastifyInstance) => {
  fastify.get(
    '/orders',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const orm = SingletonOrmDatabaseAdapter.getInstance()
      const orderRepository = new OrderRepositoryImpl(orm.database)
      const createOrderUseCase = new FindOrderUseCaseImpl(orderRepository)
      const controller = new FindOrderController(createOrderUseCase)
      await controller.execute(request, reply)
    },
  )
}
