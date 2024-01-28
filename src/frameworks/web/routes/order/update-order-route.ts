import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { SingletonOrmDatabaseAdapter } from '../../../../../src/frameworks/database/mysql-orm-adapter'
import { OrderRepositoryImpl } from '../../../output-adapters/repositories/order-repository'
import { updateOrderSwagger } from '../../../output-adapters/swagger'
import { UpdateOrderUseCaseImpl } from '../../../use-cases/orders/update-order-use-case'
import { FakeQueueServiceAdapter } from '../../../output-adapters/external-services/fake-queue-service/fake-queue-service-adapter'
import { UpdateOrderController } from '../../controllers/orders/update-order-controller'
import { GetOrderUseCaseImpl } from '../../../use-cases/orders/get-order-use-case'

export const updateOrderRoute = async (fastify: FastifyInstance) => {
  fastify.patch(
    '/orders/:id',
    updateOrderSwagger(),
    async (request: FastifyRequest, reply: FastifyReply) => {
      const orm = SingletonOrmDatabaseAdapter.getInstance()
      const queueService = new FakeQueueServiceAdapter(orm.database)
      const orderRepository = new OrderRepositoryImpl(orm.database)
      const getOrderUseCase = new GetOrderUseCaseImpl(orderRepository)
      const updateOrderUseCase = new UpdateOrderUseCaseImpl(queueService, orderRepository)
      const controller = new UpdateOrderController(getOrderUseCase, updateOrderUseCase)
      await controller.execute(request, reply)
    },
  )
}
