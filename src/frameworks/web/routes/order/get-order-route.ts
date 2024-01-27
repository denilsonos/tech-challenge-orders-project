import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { MysqlOrmAdapter } from '../../../../../src/frameworks/database/mysql-orm-adapter'
import { OrderController } from '../../../../adapters/controllers/orders/orders-controller'
import { Exception } from '../../../../core/entities/exceptions'
import { getOrderSwagger } from '../../swagger'

export const getOrderRoute = async (fastify: FastifyInstance) => {
  fastify.get(
    '/orders/:id',
    getOrderSwagger(),
    async (request: FastifyRequest, reply: FastifyReply) => {
      const orm = MysqlOrmAdapter.getInstance()
      const controller = new OrderController(orm.database)

      await controller.get(request).then((orders) => {
        return reply.status(200).send({ orders })
      })
      .catch((error) => {
        if (error instanceof Exception) {
          return reply.status(error.statusCode).send(error.body)
        }
      })
  },
  )
}
