import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { SingletonOrmDatabaseAdapter } from '../../../../infrastructure/adapters/orm-adapter/singleton-orm-database-adapter'
import { ItemRepositoryImpl } from '../../../output-adapters/repositories/item-repository'
import { GetItemUseCaseImpl } from '../../../use-cases/items/get-item-use-case'
import { GetItemController } from '../../controllers/items/get-item-controller'

export const getItemRoute = async (fastify: FastifyInstance) => {
  fastify.get(
    '/items/:id',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const orm = SingletonOrmDatabaseAdapter.getInstance()
      const itemRepository = new ItemRepositoryImpl(orm.database)
      const getItemUseCase = new GetItemUseCaseImpl(itemRepository)
      const controller = new GetItemController(getItemUseCase)
      await controller.execute(request, reply)
    },
  )
}
