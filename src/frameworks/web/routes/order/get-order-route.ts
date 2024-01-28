import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { MysqlOrmAdapter } from '../../../database/mysql-orm-adapter'
import { getOrderSwagger } from '../../swagger'
import { OrderController } from '../../../../adapters/controllers/orders/orders-controller'
import { Exception } from '../../../../core/entities/exceptions'

export const getOrderRoute = async (fastify: FastifyInstance) => {
  fastify.get(
    '/orders/:id',
    getOrderSwagger(),
    async (request: FastifyRequest, reply: FastifyReply) => {
      const orm = MysqlOrmAdapter.getInstance()
      const controller = new OrderController(orm.database)
      await controller.get(request)
      .then(() => {
        
      })
      .catch((error) => {
        if (error instanceof Exception) {
          return reply.status(error.statusCode).send(error.body)
        }
      });
    },
  )
}
