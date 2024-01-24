import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { getAllClientSwagger } from '../../swagger'
import { MysqlOrmAdapter } from '../../../database/mysql-orm-adapter'
import { ClientRepositoryImpl } from '../../../../adapters/repositories/client-repository'
import { ClientUseCaseImpl } from '../../../../core/use-cases/client/client-use-case'
import { GetAllClientsController } from '../../../../adapters/controllers/clients/get-all-clients-controller'

export const getAllRoute = async (fastify: FastifyInstance) => {
  fastify.get(
    '/clients',
    getAllClientSwagger(),
    async (request: FastifyRequest, reply: FastifyReply) => {
      const orm = MysqlOrmAdapter.getInstance()
      const repository = new ClientRepositoryImpl(orm.database)
      const usecase = new ClientUseCaseImpl(repository)
      const controller = new GetAllClientsController(usecase)
      const allClients = await controller.execute();

      return reply.status(200).send({
        allClients
      });
    },
  )
}
