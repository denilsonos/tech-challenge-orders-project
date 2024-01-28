import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { getOrderPaymentSwagger } from '../../swagger'
import { MysqlOrmAdapter } from '../../../database/mysql-orm-adapter'
import { PaymentController } from '../../../../adapters/controllers/payments/payment-controller'
import { Exception } from '../../../../core/entities/exceptions'

export const getOrderPaymentRoute = async (fastify: FastifyInstance) => {
  fastify.get(
    '/orders/payments/:id',
    getOrderPaymentSwagger(),
    async (request: FastifyRequest, reply: FastifyReply) => {
      const orm = MysqlOrmAdapter.getInstance()
      const controller = new PaymentController(orm.database)
      await controller
        .getOrder(request.params)
        .then((payment) => {
          return reply.status(200).send({
            message: 'Payment found successfully!',
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
