import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { getAllClientSwagger } from '../../swagger'
import { MysqlOrmAdapter } from '../../../database/mysql-orm-adapter'
import { Exception } from '../../../../core/entities/exceptions'
import { ClientController } from '../../../../adapters/controllers/clients/client-controller'
import { ClientDTO } from '../../../../base/dtos/client'

export const getAllRoute = async (fastify: FastifyInstance) => {
  fastify.get(
    '/clients',
    getAllClientSwagger(),
    async (request: FastifyRequest, reply: FastifyReply) => {
      const orm = MysqlOrmAdapter.getInstance()
      // const repository = new ClientRepositoryImpl(orm.database)
      // const usecase = new ClientUseCaseImpl(repository)
      // const controller = new GetAllClientsController(usecase)

      //TODO: Alterar o orm.database para interface
      const controller = new ClientController(orm.database)

      await controller.getAll()
        .then((clients) => {
          return reply.status(200).send({ clients: ClientDTO.EntitiesToDto(clients) })
        })
        .catch((error) => {
          if (error instanceof Exception) {
            return reply.status(error.statusCode).send(error.body)
          }
        })
    },
  )
}
