import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { getByParamClientSwagger } from '../../swagger'
import { MysqlOrmAdapter } from '../../../database/mysql-orm-adapter'
import { ClientRepositoryImpl } from '../../../../adapters/repositories/client-repository'
import { ClientUseCaseImpl } from '../../../../core/use-cases/client/client-use-case'
import { GetByParamController } from '../../../../adapters/controllers/clients/get-by-param-client-controller'
import { Exception } from '../../../../core/entities/exceptions'

export const getByParamRoute = async (fastify: FastifyInstance) => {
  fastify.get(
    '/clients/:identifier',
    getByParamClientSwagger(),
    async (request: FastifyRequest, reply: FastifyReply) => {
      const orm = MysqlOrmAdapter.getInstance()
      const repository = new ClientRepositoryImpl(orm.database)
      const usecase = new ClientUseCaseImpl(repository)
      const controller = new GetByParamController(usecase)
      await controller.execute(request.params)
        .then((client) => {
          return reply.status(200).send({
            message: "Client found!",
            client
          })
        })
        .catch((error) => {
          if (error instanceof Exception) {
            return reply.status(error.statusCode).send(error.body)
          }
        })
    },
  )
}