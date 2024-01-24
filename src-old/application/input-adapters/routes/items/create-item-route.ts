import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { SingletonOrmDatabaseAdapter } from '../../../../../src/frameworks/database/mysql-orm-adapter'
import { ItemRepositoryImpl } from '../../../output-adapters/repositories/item-repository'
import { CreateItemUseCaseImpl } from '../../../use-cases/items/create-item-use-case'
import { CreateItemController } from '../../controllers/items/create-item-controller'
import { createItemSwagger } from '../../../output-adapters/swagger'

export const createItemRoute = async (fastify: FastifyInstance) => {
  fastify.post(
    '/items',
    createItemSwagger(),
    async (request: FastifyRequest, reply: FastifyReply) => {
      const orm = SingletonOrmDatabaseAdapter.getInstance()
      const itemRepository = new ItemRepositoryImpl(orm.database)
      const createItemUseCase = new CreateItemUseCaseImpl(itemRepository)
      const controller = new CreateItemController(createItemUseCase)
      await controller.execute(request, reply)
    },
  )
}
