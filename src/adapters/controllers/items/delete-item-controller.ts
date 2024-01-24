import { Controller } from '../../gateways/controllers/controller'
import { validateId } from '../validators/identifier-validator'
import { ItemUseCase } from '../../gateways/use-cases/item-use-case'
import { BadRequestException } from '../../../core/entities/exceptions'

export class DeleteItemController implements Controller {
  constructor(private readonly itemUseCase: ItemUseCase) { }

  public async execute(params: unknown): Promise<any> {
    const result = validateId(params)
    if (!result.success) {
      // return reply.status(400).send({
      //   message: 'Validation error!',
      //   issues: result.error.issues,
      // })
      throw new BadRequestException('Validation error!', result.error.issues)
    }

    await this.itemUseCase.delete(Number(result.data.id))
  }
}
