import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { Exception } from '../../../../core/entities/exceptions'
import { deleteItemSwagger } from '../../swagger'
import { MysqlOrmAdapter } from '../../../database/mysql-orm-adapter'
import { ItemController } from '../../../../adapters/controllers/items/item-controller'

export const deleteItemRoute = async (fastify: FastifyInstance) => {
  fastify.delete(
    '/items/:id',
    deleteItemSwagger(),
    async (request: FastifyRequest, reply: FastifyReply) => {
      const orm = MysqlOrmAdapter.getInstance()
      const controller = new ItemController(orm.database)
      
      await controller.delete(request.params)
        .then(() => {
          return reply.status(200).send({
            message: 'Item deleted successfully!'
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
