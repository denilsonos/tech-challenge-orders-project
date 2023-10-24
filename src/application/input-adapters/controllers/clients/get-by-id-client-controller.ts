import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { Client } from "../../../../domain/entitites/client";
import { Controller } from "../../../../domain/ports/controllers/controller";
import { GetByIdClientUseCase } from "../../../../domain/ports/use-cases/clients/get-by-id-client-use-case";

export class GetByIdClientController implements Controller {

    constructor(private readonly getByIdClientUseCase: GetByIdClientUseCase) { }

    public async execute(request: FastifyRequest,
        reply: FastifyReply,
    ): Promise<any> {

        const bodySchema = z.object({
            id: z.number()
        })
        const { id } = bodySchema.parse(request.body);

        const client: Client | null = await this.getByIdClientUseCase.execute(id);

        return reply.status(200).send({
            client
        })
    }
}