import { FastifyRequest, FastifyReply } from "fastify";
import { z } from 'zod'
import { Controller } from "../../../../domain/ports/controllers/controller";
import { CreateClientUseCase } from "../../../../domain/ports/use-cases/clients/create-client-use-case";
import { Client } from "../../../../domain/entitites/client";
import { cpfValidator } from "../../commons/validators/cpf-validatior";

export class CreateClientController implements Controller {

    constructor(private readonly createClientUseCase: CreateClientUseCase) { }

    public async execute(request: FastifyRequest,
        reply: FastifyReply,
    ): Promise<any> {

        const result = this.validate(request.body)

        if (!result.success) {
            return reply.status(400).send({
                message: 'Validation error!',
                issues: result.error.issues,
            })
        }
        const { cpf, email, name } = result.data;
        const registeredClient: Client | null = await this.createClientUseCase
            .execute({ cpf, email, name });

        if (registeredClient) {
            return reply.status(201).send({
                message: 'Client successfully registered!'
            })
        }

        return reply.status(409).send({
            message: 'Client already exists!'
        })
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
        return schema.safeParse(params)
    }
}