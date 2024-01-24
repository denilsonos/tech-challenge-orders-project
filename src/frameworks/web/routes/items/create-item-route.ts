import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { createItemSwagger } from '../../swagger'
import { MysqlOrmAdapter } from '../../../database/mysql-orm-adapter'
import { ItemRepositoryImpl } from '../../../../adapters/repositories/item-repository'
import { ItemUseCaseImpl } from '../../../../core/use-cases/item-use-case'
import { CreateItemController } from '../../../../adapters/controllers/items/create-item-controller'
import { Exception } from '../../../../core/entities/exceptions'


export const createItemRoute = async (fastify: FastifyInstance) => {
  fastify.post(
    '/items',
    createItemSwagger(),
    async (request: FastifyRequest, reply: FastifyReply) => {
      const orm = MysqlOrmAdapter.getInstance()
      const itemRepository = new ItemRepositoryImpl(orm.database)
      const itemUseCase = new ItemUseCaseImpl(itemRepository)
      const controller = new CreateItemController(itemUseCase)
      await controller.execute(request.body)
        .then((itemId) => {
          return reply.status(201).send({
            message: 'Item created successfully!',
            itemId: itemId,
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
