import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { SingletonOrmDatabaseAdapter } from '../../../../infrastructure/adapters/orm-adapter/singleton-orm-database-adapter'
import { ClientRepositoryImpl } from '../../../output-adapters/repositories/client-repository'
import { GetByEmailClientUseCaseImpl } from '../../../use-cases/client/get-by-email-client-use-case'
import { GetByEmailClientController } from '../../controllers/clients/get-by-email-client-controller'

export const getByEmailRoute = async (fastify: FastifyInstance) => {
  fastify.get(
    '/client/getByEmail',
    {
      schema: {
        tags: ['Client'],
        querystring: {
          email: { type: 'string' }
        },
        response: {
          200: {
            type: 'object',
            properties: {
              message: { type: 'string' },
              client: {
                type: 'object',
                properties: {
                  cpf: { type: 'string' },
                  email: { type: 'string' },
                  name: { type: 'string' },
                  id: { type: 'number' },
                }
              }
            }
          }
        }
      }
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const orm = SingletonOrmDatabaseAdapter.getInstance()
      const repository = new ClientRepositoryImpl(orm.database)
      const usecase = new GetByEmailClientUseCaseImpl(repository)
      const controller = new GetByEmailClientController(usecase)
      await controller.execute(request, reply)
    },
  )
}
