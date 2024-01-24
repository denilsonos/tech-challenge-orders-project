import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { findItemSwagger } from '../../swagger'
import { MysqlOrmAdapter } from '../../../database/mysql-orm-adapter'
import { ItemRepositoryImpl } from '../../../../adapters/repositories/item-repository'
import { ItemUseCaseImpl } from '../../../../core/use-cases/item-use-case'
import { FindItemController } from '../../../../adapters/controllers/items/find-item-controller'
import { Exception } from '../../../../core/entities/exceptions'

export const findItemRoute = async (fastify: FastifyInstance) => {
  fastify.get(
    '/items',
    findItemSwagger(),
    async (request: FastifyRequest, reply: FastifyReply) => {
      const orm = MysqlOrmAdapter.getInstance()
      const itemRepository = new ItemRepositoryImpl(orm.database)
      const itemUseCase = new ItemUseCaseImpl(itemRepository)
      const controller = new FindItemController(itemUseCase)
      await controller.execute(request.query)
        .then((items) => {
          return reply.status(200).send({
            message: `${items.length} items found!`,
            items: items,
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