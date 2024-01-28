import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { findItemSwagger } from '../../swagger'
import { MysqlOrmAdapter } from '../../../database/mysql-orm-adapter'
import { ItemRepositoryImpl } from '../../../../adapters/repositories/item-repository'
import { ItemUseCaseImpl } from '../../../../core/use-cases/item-use-case'
import { Exception } from '../../../../core/entities/exceptions'
import { ItemController } from '../../../../adapters/controllers/items/item-controller'

export const findItemRoute = async (fastify: FastifyInstance) => {
  fastify.get(
    '/items',
    findItemSwagger(),
    async (request: FastifyRequest, reply: FastifyReply) => {
      const orm = MysqlOrmAdapter.getInstance()
      const controller = new ItemController(orm.database);

      await controller.findByParams(request.query)
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