import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { getByParamClientSwagger } from '../../swagger'
import { MysqlOrmAdapter } from '../../../database/mysql-orm-adapter'
import { Exception } from '../../../../core/entities/exceptions'
import { ClientController } from '../../../../adapters/controllers/clients/client-controller'
import { ClientDTO } from '../../../../base/dtos/client'

export const getByParamRoute = async (fastify: FastifyInstance) => {
  fastify.get(
    '/clients/:identifier',
    getByParamClientSwagger(),
    async (request: FastifyRequest, reply: FastifyReply) => {
      const orm = MysqlOrmAdapter.getInstance()
      const controller = new ClientController(orm.database)
      
      await controller.getByParam(request.params)
        .then((client) => {
          return reply.status(200).send({
            message: "Client found!",
            client: ClientDTO.EntityToDto(client)
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