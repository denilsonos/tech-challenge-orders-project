import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { createItemSwagger } from '../../swagger'
import { MysqlOrmAdapter } from '../../../database/mysql-orm-adapter'
import { Exception } from '../../../../core/entities/exceptions'
import { ItemController } from '../../../../adapters/controllers/items/item-controller'

export const createItemRoute = async (fastify: FastifyInstance) => {
  fastify.post(
    '/items',
    createItemSwagger(),
    async (request: FastifyRequest, reply: FastifyReply) => {
      const orm = MysqlOrmAdapter.getInstance();
      const controller = new ItemController(orm.database);

      await controller.create(request.body)
        //then((item))
        .then((itemId) => {
          return reply.status(201).send({
            message: 'Item created successfully!',
            itemId: itemId,
            //itemId: ItemDTO.EntityToDto(item).id
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
