import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { SingletonOrmDatabaseAdapter } from '../../../../infrastructure/adapters/orm-adapter/singleton-orm-database-adapter'
import { ItemRepositoryImpl } from '../../../output-adapters/repositories/item-repository'
import { FindItemUseCaseImpl } from '../../../use-cases/items/find-item-use-case'
import { FindItemController } from '../../controllers/items/find-item-controller'
import { findItemSwagger } from '../../../output-adapters/swagger'

export const findItemRoute = async (fastify: FastifyInstance) => {
  fastify.get(
    '/items',
    findItemSwagger(),
    async (request: FastifyRequest, reply: FastifyReply) => {
      const orm = SingletonOrmDatabaseAdapter.getInstance()
      const itemRepository = new ItemRepositoryImpl(orm.database)
      const getItemUseCase = new FindItemUseCaseImpl(itemRepository)
      const controller = new FindItemController(getItemUseCase)
      await controller.execute(request, reply)
    },
  )
}
