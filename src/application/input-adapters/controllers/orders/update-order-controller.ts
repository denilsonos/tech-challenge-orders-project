import { FastifyReply, FastifyRequest } from 'fastify'
import { Controller } from '../../../../domain/ports/controllers/controller'
import { z } from 'zod'
import { validateId } from '../../commons/validators/identifier-validator'
import { GetOrderUseCase } from '../../../../domain/ports/use-cases/orders/get-order-use-case'
import { OrderStatus } from '../../../../domain/enums/order-status'
import { UpdateOrderUseCase } from '../../../../domain/ports/use-cases/orders/update-order-use-case'

export class UpdateOrderController implements Controller {
  constructor(private readonly getOrderUseCase: GetOrderUseCase, private readonly updateOrderUseCase: UpdateOrderUseCase) { }

  public async execute(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<any> {
    const { params, body } = this.validate(request.params, request.body)

    if (!params.success) {
      return reply.status(400).send({
        message: 'Validation error!',
        issues: params.error.issues,
      })
    }

    if (!body.success) {
      return reply.status(400).send({
        message: 'Validation error!',
        issues: body.error.issues,
      })
    }

    const order = await this.getOrderUseCase.getById(Number(params.data.id))
    if (!order) {
      return reply.status(404).send({
        message: 'Order not found!',
      })
    }

    if (order.status !== OrderStatus.Ready) {
      return reply.status(409).send({
        message: 'The status of the order does not allow it to be finalized!'
      })
    }

    await this.updateOrderUseCase.update(order, { status: body.data.status })

    return reply.status(200).send({
      message: 'Order finished successfully!',
    })
  }

  private validate(params: FastifyRequest['params'], body: FastifyRequest['body']) {
    const bodySchema = z.object({
      status: z.enum([OrderStatus.Finished]),
    })

    return {
      params: validateId(params),
      body: bodySchema.safeParse(body)
    }
  }
}
