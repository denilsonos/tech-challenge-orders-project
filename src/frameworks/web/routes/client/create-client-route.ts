import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { MysqlOrmAdapter } from '../../../database/mysql-orm-adapter'
import { createClientSwagger } from '../../swagger'
import { Exception } from '../../../../core/entities/exceptions'
import { ClientController } from '../../../../adapters/controllers/clients/client-controller'

export const createClientRoute = async (fastify: FastifyInstance) => {
  fastify.post(
    '/clients',
    createClientSwagger(),
    async (request: FastifyRequest, reply: FastifyReply) => {
        const orm = MysqlOrmAdapter.getInstance();
        const controller = new ClientController(orm.database);

        await controller.create(request.body)
        .then(() => {
          return reply.status(201).send({
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
