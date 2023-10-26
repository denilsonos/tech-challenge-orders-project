import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { SingletonOrmDatabaseAdapter } from '../../../../infrastructure/adapters/orm-adapter/singleton-orm-database-adapter'
import { ClientRepositoryImpl } from '../../../output-adapters/repositories/client-repository'
// import { GetByIdClientUseCaseImpl } from '../../../use-cases/client/get-by-id-client-use-case'
// import { GetByIdClientController } from '../../controllers/clients/get-by-id-client-controller'
import { getByIdClientSwagger } from '../../../output-adapters/swagger'
import { GetByParamClientUseCaseImpl } from '../../../use-cases/client/get-by-param-use-case'
import { GetByParamController } from '../../controllers/clients/get-by-param-client-controller'

export const getByParamRoute = async (fastify: FastifyInstance) => {
  fastify.get(
    '/clients/:identifier',
    getByIdClientSwagger(),
    async (request: FastifyRequest, reply: FastifyReply) => {
      const orm = SingletonOrmDatabaseAdapter.getInstance()
      const repository = new ClientRepositoryImpl(orm.database)
      const usecase = new GetByParamClientUseCaseImpl(repository)
      const controller = new GetByParamController(usecase)
      await controller.execute(request, reply)
    },
  )
}