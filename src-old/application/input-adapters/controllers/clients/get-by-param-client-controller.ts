import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { Controller } from "../../../../domain/ports/controllers/controller";
// import { GetAllClientsUseCase } from "../../../../domain/ports/use-cases/clients/get-all-clients-use-case";
import { Client } from "../../../../domain/entitites/client";
import { GetByParamClientUseCase } from "../../../../domain/ports/use-cases/clients/get-by-param-use-case";

export class GetByParamController implements Controller {

    constructor(private readonly getByParamClientUseCase: GetByParamClientUseCase) { }

    public async execute(request: FastifyRequest,
        reply: FastifyReply,
    ): Promise<any> {

        const result = this.validate(request.params)

        if (!result.success) {
            return reply.status(400).send({
                message: 'Validation error!',
                issues: result.error.issues,
            })
        }

        const { identifier } = result.data;
        
        const client: Client | null = await this.getByParamClientUseCase.execute(identifier);

        if(!client?.id) {
            return reply.status(404).send({
                message: "Client not found!"
            })
        }

        return reply.status(200).send({
            message: "Client found!",
            client
        })
    }

    private validate(params: FastifyRequest['params']) {
        const schema = z.object({
            identifier: z.string().or(z.number()) 
        })
        return schema.safeParse(params);
    }
}