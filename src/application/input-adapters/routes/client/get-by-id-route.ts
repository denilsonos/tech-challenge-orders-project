import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { SingletonOrmDatabaseAdapter } from '../../../../infrastructure/adapters/orm-adapter/singleton-orm-database-adapter'
import { ClientRepositoryImpl } from '../../../output-adapters/repositories/client-repository'
import { GetByIdClientUseCaseImpl } from '../../../use-cases/client/get-by-id-client-use-case'
import { GetByIdClientController } from '../../controllers/clients/get-by-id-client-controller'

export const getByIdRoute = async (fastify: FastifyInstance) => {
  fastify.get(
    '/client/getById',
    {
      schema: {
        tags: ['Client'],
        querystring: {
          id: { type: 'number'}
        }
      }
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const orm = SingletonOrmDatabaseAdapter.getInstance()
      const repository = new ClientRepositoryImpl(orm.database)
      const usecase = new GetByIdClientUseCaseImpl(repository)
      const controller = new GetByIdClientController(usecase)
      await controller.execute(request, reply)
    },
  )
}
