import { FastifyRequest, FastifyReply } from "fastify";
import { z } from 'zod'
import { BadRequestException, ConflictException } from "../../../core/entities/exceptions";
import { Controller } from "../../gateways/controllers/controller";
import { ClientUseCase } from "../../gateways/use-cases/client-use-case";
import { cpfValidator } from "../validators/cpf-validatior";

export class CreateClientController implements Controller {

    constructor(private readonly clientUseCase: ClientUseCase) { }

    public async execute(params: any): Promise<void> {

        const result = this.validate(params);

        if (!result.success) {
            throw new BadRequestException('Validation error!', result.error.issues);
        }
        const { cpf, email, name } = result.data;

        await this.clientUseCase.create({ cpf, email, name });
    }

    private validate(params: FastifyRequest['body']) {
        const schema = z.object({
            cpf: z.string()
                .refine(value => cpfValidator(value), {
                    message: 'CPF invalid!',
                }),
            email: z
                .string()
                .email('This is not a valid email!'),
            name: z.string(),
        })
        return schema.safeParse(params);
    }
}