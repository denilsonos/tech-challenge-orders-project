import { FastifyReply, FastifyRequest } from 'fastify'
import { Controller } from '../../../../domain/ports/controllers/controller'
import { GetItemUseCase } from '../../../../domain/ports/use-cases/items/get-item-use-case'
import { validateId } from '../../commons/validators/identifier-validator'

export class GetItemController implements Controller {
  constructor(private readonly getItemUseCase: GetItemUseCase) { }

  public async execute(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<any> {
    const result = validateId(request.params)
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
}
