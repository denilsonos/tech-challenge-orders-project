import { FastifyRequest, FastifyReply } from "fastify";
import { Controller } from "../../gateways/controllers/controller";
import { ClientUseCase } from "../../gateways/use-cases/client-use-case";
import { Client } from "../../../core/entities/client";


export class GetAllClientsController implements Controller {

    constructor(private readonly clientUseCase: ClientUseCase) { }

    public async execute(): Promise<Client[] | null> {

        const clients: Client[] | null = await this.clientUseCase.getAll();

        return clients;
    }
}