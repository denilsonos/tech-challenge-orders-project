import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { getItemSwagger } from '../../swagger'
import { MysqlOrmAdapter } from '../../../database/mysql-orm-adapter'
import { Exception } from '../../../../core/entities/exceptions'
import { ItemController } from '../../../../adapters/controllers/items/item-controller'

export const getItemRoute = async (fastify: FastifyInstance) => {
  fastify.get(
    '/items/:id',
    getItemSwagger(),
    async (request: FastifyRequest, reply: FastifyReply) => {
      const orm = MysqlOrmAdapter.getInstance()
      const controller = new ItemController(orm.database)

      await controller.getById(request.params)
        .then((item) => {
          return reply.status(200).send({
            message: 'Item found successfully!',
            item: item,
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