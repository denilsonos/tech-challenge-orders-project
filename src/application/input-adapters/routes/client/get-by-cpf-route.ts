import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { SingletonOrmDatabaseAdapter } from '../../../../infrastructure/adapters/orm-adapter/singleton-orm-database-adapter'
import { ClientRepositoryImpl } from '../../../output-adapters/repositories/client-repository'
import { GetByCpfClientUseCaseImpl } from '../../../use-cases/client/get-by-cpf-client-use-case'
import { GetByCpfClientController } from '../../controllers/clients/get-by-cpf-client-controller'

export const getByCpfRoute = async (fastify: FastifyInstance) => {
  fastify.get(
    '/client/getByCPF',
    {
      schema: {
        tags: ['Client'],
        querystring: {
          cpf: { type: 'string' }
        }
      }
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const orm = SingletonOrmDatabaseAdapter.getInstance()
      const repository = new ClientRepositoryImpl(orm.database)
      const usecase = new GetByCpfClientUseCaseImpl(repository)
      const controller = new GetByCpfClientController(usecase)
      await controller.execute(request, reply)
    },
  )
}
