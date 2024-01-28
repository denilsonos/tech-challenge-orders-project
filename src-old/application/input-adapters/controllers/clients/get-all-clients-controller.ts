import { FastifyRequest, FastifyReply } from "fastify";
import { Controller } from "../../../../domain/ports/controllers/controller";
import { GetAllClientsUseCase } from "../../../../domain/ports/use-cases/clients/get-all-clients-use-case";
import { Client } from "../../../../domain/entitites/client";

export class GetAllClientsController implements Controller {

    constructor(private readonly getAllClientsUseCase: GetAllClientsUseCase) { }

    public async execute(_request: FastifyRequest,
        reply: FastifyReply,
    ): Promise<any> {

        const clients: Client[]  = await this.getAllClientsUseCase.execute();

        return reply.status(200).send({
            clients
        })
    }
}