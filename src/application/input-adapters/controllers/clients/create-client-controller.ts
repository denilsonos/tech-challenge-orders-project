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

        const bodySchema = z.object({
            client: z
                .object({
                    cpf: z.string(),
                    email: z.string(),
                    name: z.string(),
                })
        })
        const { client } = bodySchema.parse(request.body);
        const registeredClient: Client | null = await this.createClientUseCase.execute(client);

        if(registeredClient) {
            return reply.status(201).send({
                message: 'Cliente cadastrado com sucesso!'
            })
        }

        return reply.status(409).send({
            message: "Cliente já possui cadastro!"
        })
    }
}