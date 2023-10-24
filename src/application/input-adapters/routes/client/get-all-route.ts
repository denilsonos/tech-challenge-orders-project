import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { SingletonOrmDatabaseAdapter } from '../../../../infrastructure/adapters/orm-adapter/singleton-orm-database-adapter'
import { ClientRepositoryImpl } from '../../../output-adapters/repositories/client-repository'
import { GetAllClientsUseCaseImpl } from '../../../use-cases/client/get-all-clients-use-case'
import { GetAllClientsController } from '../../controllers/clients/get-all-clients-controller'

export function getAllRoute(
  fastify: FastifyInstance,
  options: any,
  done: () => void,
): void {
  const orm = SingletonOrmDatabaseAdapter.getInstance()
  const repository = new ClientRepositoryImpl(orm.database)
  const usecase = new GetAllClientsUseCaseImpl(repository)
  const controller = new GetAllClientsController(usecase)

  fastify.get('/client/getAll', controller.execute.bind(controller))

  done()
}
