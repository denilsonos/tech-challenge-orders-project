import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { Exception } from '../../../../core/entities/exceptions'
import { deleteItemSwagger } from '../../swagger'
import { MysqlOrmAdapter } from '../../../database/mysql-orm-adapter'
import { ItemRepositoryImpl } from '../../../../adapters/repositories/item-repository'
import { ItemUseCaseImpl } from '../../../../core/use-cases/items/item-use-case'
import { DeleteItemController } from '../../../../adapters/controllers/items/delete-item-controller'

export const deleteItemRoute = async (fastify: FastifyInstance) => {
  fastify.delete(
    '/items/:id',
    deleteItemSwagger(),
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const orm = MysqlOrmAdapter.getInstance()
        const itemRepository = new ItemRepositoryImpl(orm.database)
        const itemUseCase = new ItemUseCaseImpl(itemRepository)
        const controller = new DeleteItemController(itemUseCase)
        await controller.execute(request.params)
        
        return reply.status(200).send({
          message: 'Item deleted successfully!'
        })
      } catch (error) {
        if (error instanceof Exception) {
          return reply.status(error.statusCode).send(error.body)
        }
      }
    },
  )
}
