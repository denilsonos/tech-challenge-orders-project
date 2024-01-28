import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { SingletonOrmDatabaseAdapter } from '../../../../../src/frameworks/database/mysql-orm-adapter'
import { ItemRepositoryImpl } from '../../../output-adapters/repositories/item-repository'
import { updateItemSwagger } from '../../../output-adapters/swagger'
import { UpdateItemUseCaseImpl } from '../../../use-cases/items/update-item-use-case'
import { UpdateItemController } from '../../controllers/items/update-item-controller'
import { GetItemUseCaseImpl } from '../../../use-cases/items/get-item-use-case'

export const updateItemRoute = async (fastify: FastifyInstance) => {
  fastify.patch(
    '/items/:id',
    updateItemSwagger(),
    async (request: FastifyRequest, reply: FastifyReply) => {
      const orm = SingletonOrmDatabaseAdapter.getInstance()
      const itemRepository = new ItemRepositoryImpl(orm.database)
      const updateItemUseCase = new UpdateItemUseCaseImpl(itemRepository)
      const getItemUseCase = new GetItemUseCaseImpl(itemRepository)
      const controller = new UpdateItemController(updateItemUseCase, getItemUseCase)
      await controller.execute(request, reply)
    },
  )
}
