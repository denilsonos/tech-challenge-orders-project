import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { SingletonOrmDatabaseAdapter } from '../../../../infrastructure/adapters/orm-adapter/singleton-orm-database-adapter'
import { ItemRepositoryImpl } from '../../../output-adapters/repositories/item-repository'
import { CreateItemUseCaseImpl } from '../../../use-cases/items/create-item-use-case'
import { CreateItemController } from '../../controllers/items/create-item-controller'

export const createItemRoute = async (fastify: FastifyInstance) => {
  fastify.post(
    '/items',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const orm = SingletonOrmDatabaseAdapter.getInstance()
      const itemRepository = new ItemRepositoryImpl(orm.database)
      const createItemUseCase = new CreateItemUseCaseImpl(itemRepository)
      const controller = new CreateItemController(createItemUseCase)
      await controller.execute(request, reply)
    },
  )
}
