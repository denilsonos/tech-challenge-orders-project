import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { MysqlOrmAdapter } from '../../../database/mysql-orm-adapter'
import { createClientSwagger } from '../../swagger'
import { ClientRepositoryImpl } from '../../../../adapters/repositories/client-repository'
import { ClientUseCaseImpl } from '../../../../core/use-cases/client/client-use-case'
import { CreateClientController } from '../../../../adapters/controllers/clients/create-client-controller'
import { Exception } from '../../../../core/entities/exceptions'

export const createClientRoute = async (fastify: FastifyInstance) => {
  fastify.post(
    '/clients',
    createClientSwagger(),
    async (request: FastifyRequest, reply: FastifyReply) => {

        const orm = MysqlOrmAdapter.getInstance()
        const repository = new ClientRepositoryImpl(orm.database)
        const usecase = new ClientUseCaseImpl(repository)
        const controller = new CreateClientController(usecase)
        await controller.execute(request.body)
        .then(() => {
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
