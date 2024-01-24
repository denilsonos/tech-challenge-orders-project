import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { SingletonOrmDatabaseAdapter } from '../../../../../src/frameworks/database/mysql-orm-adapter'
import { OrderRepositoryImpl } from '../../../output-adapters/repositories/order-repository'
import { CreateOrderUseCaseImpl } from '../../../use-cases/orders/create-order-use-case'
import { CreateOrderController } from '../../controllers/orders/create-order-controller'
import { GetItemUseCaseImpl } from '../../../use-cases/items/get-item-use-case'
import { GetByIdClientUseCaseImpl } from '../../../use-cases/client/get-by-id-client-use-case'
import { ItemRepositoryImpl } from '../../../output-adapters/repositories/item-repository'
import { createOrderSwagger } from '../../../output-adapters/swagger'
import { ClientRepositoryImpl } from '../../../output-adapters/repositories/client-repository'

export const createOrderRoute = async (fastify: FastifyInstance) => {
  fastify.post(
    '/orders',
    createOrderSwagger(),
    async (request: FastifyRequest, reply: FastifyReply) => {
      const orm = SingletonOrmDatabaseAdapter.getInstance()
      const orderRepository = new OrderRepositoryImpl(orm.database)
      const itemRepository = new ItemRepositoryImpl(orm.database)
      const clientRepository = new ClientRepositoryImpl(orm.database)
      const createOrderUseCase = new CreateOrderUseCaseImpl(orderRepository)
      const getItemUseCase = new GetItemUseCaseImpl(itemRepository)
      const getByIdClientUseCase = new GetByIdClientUseCaseImpl(clientRepository)
      const controller = new CreateOrderController(
        createOrderUseCase,
        getItemUseCase,
        getByIdClientUseCase
      )
      await controller.execute(request, reply)
    },
  )
}
