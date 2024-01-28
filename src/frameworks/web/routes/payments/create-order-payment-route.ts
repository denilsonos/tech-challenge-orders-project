import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { createOrderPaymentSwagger } from '../../swagger'
import { MysqlOrmAdapter } from '../../../database/mysql-orm-adapter'
import { Exception } from '../../../../core/entities/exceptions'
import { PaymentController } from '../../../../adapters/controllers/payments/payment-controller'

export const createOrderPaymentRoute = async (fastify: FastifyInstance) => {
  fastify.post(
    '/orders/payments',
    createOrderPaymentSwagger(),
    async (request: FastifyRequest, reply: FastifyReply) => {
      const orm = MysqlOrmAdapter.getInstance()
      const controller = new PaymentController(orm.database)
      await controller
        .create(request.body)
        .then((payment) => {
          return reply.status(201).send({
            message: 'Payment successfully registered!',
            payment,
          })
        })
        .catch((error: any) => {
          if (error instanceof Exception) {
            return reply.status(error.statusCode).send(error.body)
          }
        })
    },
  )
}
