import { FastifyReply, FastifyRequest } from 'fastify'
import { Controller } from '../../../../domain/ports/controllers/controller'
import { z } from 'zod'
import { GetItemUseCase } from '../../../../domain/ports/use-cases/items/get-item-use-case'

export class GetItemController implements Controller {
  constructor(private readonly getItemUseCase: GetItemUseCase) { }

  public async execute(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<any> {
    const result = this.validate(request.params)
    if (!result.success) {
      return reply.status(400).send({
        message: 'Validation error!',
        issues: result.error.issues,
      })
    }
    const item = await this.getItemUseCase.getById(Number(result.data.id))
    if (!item) {
      return reply.status(404).send({
        message: 'Item not found!',
      })
    }
    return reply.status(200).send({
      message: 'Item found successfully!',
      item: item.fromEntity(),
    })
  }

  private validate(params: FastifyRequest['params']) {
    const schema = z.object({
      id: z.string().min(1).refine(value => {
        const parsedNumber = Number(value);
        return !isNaN(parsedNumber);
      }, {
        message: 'Invalid number format',
      })
    })
    return schema.safeParse(params)
  }
}
