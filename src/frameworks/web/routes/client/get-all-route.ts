import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { SingletonOrmDatabaseAdapter } from '../../../../../src/frameworks/database/mysql-orm-adapter'
import { ClientRepositoryImpl } from '../../../output-adapters/repositories/client-repository'
import { GetAllClientsUseCaseImpl } from '../../../use-cases/client/get-all-clients-use-case'
import { GetAllClientsController } from '../../controllers/clients/get-all-clients-controller'
import { getAllClientSwagger } from '../../../output-adapters/swagger'

export const getAllRoute = async (fastify: FastifyInstance) => {
  fastify.get(
    '/clients',
    getAllClientSwagger(),
    async (request: FastifyRequest, reply: FastifyReply) => {
      const orm = SingletonOrmDatabaseAdapter.getInstance()
      const repository = new ClientRepositoryImpl(orm.database)
      const usecase = new GetAllClientsUseCaseImpl(repository)
      const controller = new GetAllClientsController(usecase)
      await controller.execute(request, reply)
    },
  )
}
