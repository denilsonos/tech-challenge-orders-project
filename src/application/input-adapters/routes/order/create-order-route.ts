import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { SingletonOrmDatabaseAdapter } from '../../../../infrastructure/adapters/orm-adapter/singleton-orm-database-adapter'
import { OrderRepositoryImpl } from '../../../output-adapters/repositories/order-repository'
import { CreateOrderUseCaseImpl } from '../../../use-cases/orders/create-order-use-case'
import { CreateOrderController } from '../../controllers/orders/create-order-controller'
import { GetItemUseCaseImpl } from '../../../use-cases/items/get-item-use-case'
import { ItemRepositoryImpl } from '../../../output-adapters/repositories/item-repository'

export const createOrderRoute = async (fastify: FastifyInstance) => {
  fastify.post(
    '/orders',
    {
      schema: {
        tags: ['Order'],
      }
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const orm = SingletonOrmDatabaseAdapter.getInstance()
      const orderRepository = new OrderRepositoryImpl(orm.database)
      const itemRepository = new ItemRepositoryImpl(orm.database)
      const createOrderUseCase = new CreateOrderUseCaseImpl(orderRepository)
      const getItemUseCase = new GetItemUseCaseImpl(itemRepository)
      const controller = new CreateOrderController(
        createOrderUseCase,
        getItemUseCase,
      )
      await controller.execute(request, reply)
    },
  )
}
