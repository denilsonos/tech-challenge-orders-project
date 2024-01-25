import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { Exception } from '../../../../core/entities/exceptions'
import { deleteItemSwagger } from '../../swagger'
import { MysqlOrmAdapter } from '../../../database/mysql-orm-adapter'
import { ItemRepositoryImpl } from '../../../../adapters/repositories/item-repository'
import { ItemUseCaseImpl } from '../../../../core/use-cases/item-use-case'
import { DeleteItemController } from '../../../../adapters/controllers/items/delete-item-controller'

export const deleteItemRoute = async (fastify: FastifyInstance) => {
  fastify.delete(
    '/items/:id',
    deleteItemSwagger(),
    async (request: FastifyRequest, reply: FastifyReply) => {
      const orm = MysqlOrmAdapter.getInstance()
      const itemRepository = new ItemRepositoryImpl(orm.database)
      //TODO: Passar o orm.database para dentro da controller
      //const controller = new Controller(orm.database)
      const itemUseCase = new ItemUseCaseImpl(itemRepository)
      //TODO: Instanciar o use case e o itemRepository para dentro da controller

      const controller = new DeleteItemController(itemUseCase)

      //TODO: Agrupar os controllers (delete, get, create) de Item em um único Controller
      
      await controller.execute(request.params)
        .then(() => {
          return reply.status(200).send({
            message: 'Item deleted successfully!'
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
