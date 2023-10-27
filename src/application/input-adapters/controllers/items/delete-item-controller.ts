import { FastifyReply, FastifyRequest } from 'fastify'
import { Controller } from '../../../../domain/ports/controllers/controller'
import { DeleteItemUseCase } from '../../../../domain/ports/use-cases/items/delete-item-use-case'
import { validateId } from '../../commons/validators/identifier-validator'
import { GetItemUseCase } from '../../../../domain/ports/use-cases/items/get-item-use-case'

export class DeleteItemController implements Controller {
  constructor(private readonly deleteItemUseCase: DeleteItemUseCase, private readonly getItemUseCase: GetItemUseCase) { }

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

    const itemId = Number(result.data.id)
    const item = await this.getItemUseCase.getById(itemId)
    if (!item) {
      return reply.status(404).send({
        message: 'Item not found!',
      })
    }

    await this.deleteItemUseCase.delete(itemId)
    return reply.status(200).send({
      message: 'Item deleted successfully!'
    })
  }
}
