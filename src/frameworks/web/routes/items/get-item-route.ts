import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { getItemSwagger } from '../../swagger'
import { MysqlOrmAdapter } from '../../../database/mysql-orm-adapter'
import { ItemRepositoryImpl } from '../../../../adapters/repositories/item-repository'
import { ItemUseCaseImpl } from '../../../../core/use-cases/item-use-case'
import { GetItemController } from '../../../../adapters/controllers/items/get-item-controller'
import { Exception } from '../../../../core/entities/exceptions'

export const getItemRoute = async (fastify: FastifyInstance) => {
  fastify.get(
    '/items/:id',
    getItemSwagger(),
    async (request: FastifyRequest, reply: FastifyReply) => {
      const orm = MysqlOrmAdapter.getInstance()
      const itemRepository = new ItemRepositoryImpl(orm.database)
      const itemUseCase = new ItemUseCaseImpl(itemRepository)
      const controller = new GetItemController(itemUseCase)
      await controller.execute(request.params)
        .then((item) => {
          return reply.status(200).send({
            message: 'Item found successfully!',
            item: item,
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