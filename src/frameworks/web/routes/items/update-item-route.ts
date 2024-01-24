import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { updateItemSwagger } from '../../swagger'
import { MysqlOrmAdapter } from '../../../database/mysql-orm-adapter'
import { ItemRepositoryImpl } from '../../../../adapters/repositories/item-repository'
import { ItemUseCaseImpl } from '../../../../core/use-cases/item-use-case'
import { UpdateItemController } from '../../../../adapters/controllers/items/update-item-controller'
import { Exception } from '../../../../core/entities/exceptions'

export const updateItemRoute = async (fastify: FastifyInstance) => {
  fastify.patch(
    '/items/:id',
    updateItemSwagger(),
    async (request: FastifyRequest, reply: FastifyReply) => {
      const orm = MysqlOrmAdapter.getInstance()
      const itemRepository = new ItemRepositoryImpl(orm.database)
      const itemUseCase = new ItemUseCaseImpl(itemRepository)
      const controller = new UpdateItemController(itemUseCase)
      await controller.execute(request.params, request.body)
      .then(() => {
        return reply.status(200).send({
          message: 'Item updated successfully!',
        })
      })
      .catch((error) => {
        if (error instanceof Exception) {
          return reply.status(error.statusCode).send(error.body)
        }
      })
    },
  )
}