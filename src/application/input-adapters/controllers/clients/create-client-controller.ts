import { FastifyRequest, FastifyReply } from "fastify";
import { z } from 'zod'
import { Controller } from "../../../../domain/ports/controllers/controller";
import { CreateClientUseCase } from "../../../../domain/ports/use-cases/clients/create-client-use-case";
import { Client } from "../../../../domain/entitites/client";

export class CreateClientController implements Controller {

    constructor(private readonly createClientUseCase: CreateClientUseCase) { }

    public async execute(request: FastifyRequest,
        reply: FastifyReply,
    ): Promise<any> {

        const result = this.validate(request.query)

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

    private validate(params: FastifyRequest['query']) {
        const schema = z.object({
            cpf: z.string(),
            email: z.string(),
            name: z.string(),
        })
        return schema.safeParse(params)
    }
}