import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { MysqlOrmAdapter} from '../../../../../src/frameworks/database/mysql-orm-adapter'
import { OrderController } from '../../../../adapters/controllers/orders/orders-controller'
import { Exception } from '../../../../core/entities/exceptions'
import { createOrderSwagger } from '../../swagger'

export const createOrderRoute = async (fastify: FastifyInstance) => {
  fastify.post(
    '/orders',
    createOrderSwagger(),
    async (request: FastifyRequest, reply: FastifyReply) => {
      const orm = MysqlOrmAdapter.getInstance()
      const controller = new OrderController(orm.database)

      await controller.create(request.body).then(() => {
        return reply.status(200).send({
          message: 'Client successfully registered!'
        });
      })
      .catch((error) => {
        if (error instanceof Exception) {
          return reply.status(error.statusCode).send(error.body)
        }
      });
    },
  )
}
