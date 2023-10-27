import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { SingletonOrmDatabaseAdapter } from '../../../../infrastructure/adapters/orm-adapter/singleton-orm-database-adapter'
import { ItemRepositoryImpl } from '../../../output-adapters/repositories/item-repository'
import { deleteItemSwagger } from '../../../output-adapters/swagger'
import { DeleteItemUseCaseImpl } from '../../../use-cases/items/delete-item-use-case'
import { DeleteItemController } from '../../controllers/items/delete-item-controller'
import { GetItemUseCaseImpl } from '../../../use-cases/items/get-item-use-case'

export const deleteItemRoute = async (fastify: FastifyInstance) => {
  fastify.delete(
    '/items/:id',
    deleteItemSwagger(),
    async (request: FastifyRequest, reply: FastifyReply) => {
      const orm = SingletonOrmDatabaseAdapter.getInstance()
      const itemRepository = new ItemRepositoryImpl(orm.database)
      const deleteItemUseCase = new DeleteItemUseCaseImpl(itemRepository)
      const getItemUseCase = new GetItemUseCaseImpl(itemRepository)
      const controller = new DeleteItemController(deleteItemUseCase, getItemUseCase)
      await controller.execute(request, reply)
    },
  )
}
