import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { Controller } from "../../../../domain/ports/controllers/controller";
import { GetByEmailClientUseCase } from "../../../../domain/ports/use-cases/clients/get-by-email-client-use-case";
import { Client } from "../../../../domain/entitites/client";

export class GetByEmailClientController implements Controller {

    constructor(private readonly getByEmailClientUseCase: GetByEmailClientUseCase) { }

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
        
        const client: Client | null = await this.getByEmailClientUseCase.execute(result.data.email);

        return reply.status(200).send({
            message: client ? "Client found!" : "Client not found!",
            client: client ?? {}
        })
    }

    private validate(params: FastifyRequest['query']) {
        const schema = z.object({
            email: z.string()
        })
        return schema.safeParse(params)
    }
}