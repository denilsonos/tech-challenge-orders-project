import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { updateItemSwagger } from '../../swagger'
import { MysqlOrmAdapter } from '../../../database/mysql-orm-adapter'
import { Exception } from '../../../../core/entities/exceptions'
import { ItemController } from '../../../../adapters/controllers/items/item-controller'

export const updateItemRoute = async (fastify: FastifyInstance) => {
  fastify.patch(
    '/items/:id',
    updateItemSwagger(),
    async (request: FastifyRequest, reply: FastifyReply) => {
      const orm = MysqlOrmAdapter.getInstance()
      const controller = new ItemController(orm.database)

      await controller.update(request.params, request.body)
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