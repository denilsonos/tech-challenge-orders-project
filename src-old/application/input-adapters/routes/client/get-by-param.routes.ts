import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { SingletonOrmDatabaseAdapter } from '../../../../../src/frameworks/database/mysql-orm-adapter'
import { ClientRepositoryImpl } from '../../../output-adapters/repositories/client-repository'
import { getByParamClientSwagger } from '../../../output-adapters/swagger'
import { GetByParamClientUseCaseImpl } from '../../../use-cases/client/get-by-param-use-case'
import { GetByParamController } from '../../controllers/clients/get-by-param-client-controller'

export const getByParamRoute = async (fastify: FastifyInstance) => {
  fastify.get(
    '/clients/:identifier',
    getByParamClientSwagger(),
    async (request: FastifyRequest, reply: FastifyReply) => {
      const orm = SingletonOrmDatabaseAdapter.getInstance()
      const repository = new ClientRepositoryImpl(orm.database)
      const usecase = new GetByParamClientUseCaseImpl(repository)
      const controller = new GetByParamController(usecase)
      await controller.execute(request, reply)
    },
  )
}