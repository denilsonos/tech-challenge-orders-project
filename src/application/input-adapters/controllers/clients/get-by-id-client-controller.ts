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
        const result = this.validate(request.query)
        
        if (!result.success) {
            return reply.status(400).send({
                message: 'Validation error!',
                issues: result.error.issues,
            })
        }

        const client: Client | null = await this.getByIdClientUseCase.execute(result.data.id);

        return reply.status(200).send({
            message: client ? "Client found" : "Client not found!",
            client: client ?? {}
        })
    }
    
    private validate(params: FastifyRequest['query']) {
        const schema = z.object({
            id: z.number()
        })
        return schema.safeParse(params)
    }
}