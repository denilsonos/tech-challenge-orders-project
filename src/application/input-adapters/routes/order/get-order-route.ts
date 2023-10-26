import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { SingletonOrmDatabaseAdapter } from '../../../../infrastructure/adapters/orm-adapter/singleton-orm-database-adapter'
import { OrderRepositoryImpl } from '../../../output-adapters/repositories/order-repository'
import { GetOrderUseCaseImpl } from '../../../use-cases/orders/get-order-use-case'
import { GetOrderController } from '../../controllers/orders/get-order-controller'

export const getOrderRoute = async (fastify: FastifyInstance) => {
  fastify.get(
    '/orders/:id',
    {
      schema: {
        tags: ['Order'],
      }
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const orm = SingletonOrmDatabaseAdapter.getInstance()
      const orderRepository = new OrderRepositoryImpl(orm.database)
      const createOrderUseCase = new GetOrderUseCaseImpl(orderRepository)
      const controller = new GetOrderController(createOrderUseCase)
      await controller.execute(request, reply)
    },
  )
}
