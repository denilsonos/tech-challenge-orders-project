import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { SingletonOrmDatabaseAdapter } from '../../../../infrastructure/adapters/orm-adapter/singleton-orm-database-adapter'
import { OrderRepositoryImpl } from '../../../output-adapters/repositories/order-repository'
import { CreateOrderUseCaseImpl } from '../../../use-cases/order/create-order-use-case'
import { CreateOrderController } from '../../controllers/orders/create-order-controller'

export const createOrderRoute = async (fastify: FastifyInstance) => {
  fastify.post('/orders', async (request: FastifyRequest, reply: FastifyReply) => {
    const orm = SingletonOrmDatabaseAdapter.getInstance()
    const repository = new OrderRepositoryImpl(orm.database)
    const usecase = new CreateOrderUseCaseImpl(repository)
    const controller = new CreateOrderController(usecase)
    await controller.execute(request, reply);
  })
}