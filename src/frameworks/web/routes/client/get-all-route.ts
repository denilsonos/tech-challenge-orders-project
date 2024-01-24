import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { getAllClientSwagger } from '../../swagger'
import { MysqlOrmAdapter } from '../../../database/mysql-orm-adapter'
import { ClientRepositoryImpl } from '../../../../adapters/repositories/client-repository'
import { ClientUseCaseImpl } from '../../../../core/use-cases/client/client-use-case'
import { GetAllClientsController } from '../../../../adapters/controllers/clients/get-all-clients-controller'
import { Exception } from '../../../../core/entities/exceptions'

export const getAllRoute = async (fastify: FastifyInstance) => {
  fastify.get(
    '/clients',
    getAllClientSwagger(),
    async (request: FastifyRequest, reply: FastifyReply) => {
      const orm = MysqlOrmAdapter.getInstance()
      const repository = new ClientRepositoryImpl(orm.database)
      const usecase = new ClientUseCaseImpl(repository)
      const controller = new GetAllClientsController(usecase)
      await controller.execute()
      .then((clients)=> {
        return {
          clients
        }
      })
      .catch((error) => {
        if (error instanceof Exception) {
          return reply.status(error.statusCode).send(error.body)
        }
      })
    },
  )
}
