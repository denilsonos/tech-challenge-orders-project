import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { MysqlOrmAdapter } from '../../../database/mysql-orm-adapter';
import { createOrderSwagger } from '../../swagger';
import { OrderController } from '../../../../adapters/controllers/orders/orders-controller';
import { Exception } from '../../../../core/entities/exceptions';

export const createOrderRoute = async (fastify: FastifyInstance) => {
  fastify.post(
    '/orders',
    createOrderSwagger(),
    async (request: FastifyRequest, reply: FastifyReply) => {
      // const orm = SingletonOrmDatabaseAdapter.getInstance()
      // const orderRepository = new OrderRepositoryImpl(orm.database)
      // const itemRepository = new ItemRepositoryImpl(orm.database)
      // const clientRepository = new ClientRepositoryImpl(orm.database)
      // const createOrderUseCase = new CreateOrderUseCaseImpl(orderRepository)
      // const getItemUseCase = new GetItemUseCaseImpl(itemRepository)
      // const getByIdClientUseCase = new GetByIdClientUseCaseImpl(clientRepository)
      // const controller = new CreateOrderController(
      //   createOrderUseCase,
      //   getItemUseCase,
      //   getByIdClientUseCase
      // )
      const orm = MysqlOrmAdapter.getInstance();
      const controller = new OrderController(orm.database);

      await controller.create(request)
      .then(() => {
        
      })
      .catch((error) => {
        if (error instanceof Exception) {
          return reply.status(error.statusCode).send(error.body)
        }
      });
    },
  )
}
