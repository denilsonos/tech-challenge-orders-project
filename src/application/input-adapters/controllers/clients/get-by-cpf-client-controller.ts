import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { Controller } from "../../../../domain/ports/controllers/controller";
import { GetByCpfClientUseCase } from "../../../../domain/ports/use-cases/clients/get-by-cpf-client-use-case";
import { Client } from "../../../../domain/entitites/client";

export class GetByCpfClientController implements Controller {

    constructor(private readonly getByCpfClientUseCase: GetByCpfClientUseCase) { }

    public async execute(request: FastifyRequest,
        reply: FastifyReply,
    ): Promise<any> {

        const bodySchema = z.object({
            cpf: z.string()
        })
        const { cpf } = bodySchema.parse(request.body);

        const client: Client | null = await this.getByCpfClientUseCase.execute(cpf);

        return reply.status(200).send({
            client
        })
    }
}