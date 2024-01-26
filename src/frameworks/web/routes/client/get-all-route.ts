import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { getAllClientSwagger } from '../../swagger'
import { MysqlOrmAdapter } from '../../../database/mysql-orm-adapter'
import { Exception } from '../../../../core/entities/exceptions'
import { ClientController } from '../../../../adapters/controllers/clients/client-controller'

export const getAllRoute = async (fastify: FastifyInstance) => {
  fastify.get(
    '/clients',
    getAllClientSwagger(),
    async (_request: FastifyRequest, reply: FastifyReply) => {
      const orm = MysqlOrmAdapter.getInstance();
      //TODO: Alterar o orm.database para interface
      
      const controller = new ClientController(orm.database)

      await controller.getAll()
        .then((clients) => {
          return reply.status(200).send({ clients })
        })
        .catch((error) => {
          if (error instanceof Exception) {
            return reply.status(error.statusCode).send(error.body)
          }
        })
    },
  )
}
