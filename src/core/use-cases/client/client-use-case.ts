import { ClientUseCase } from "../../../adapters/gateways/use-cases/client-use-case";
import { Client } from "../../entities/client";
import { ClientRepository } from "../../../adapters/gateways/repositories/client-repository";

export class ClientUseCaseImpl implements ClientUseCase {

    constructor(private readonly clientRepository: ClientRepository) { }

    async create(client: { cpf: string, email: string, name: string }): Promise<Client | null> {

        const newClient = new Client(client.cpf, client.email, client.name);

        const clientExists: Client | null = await this.verifyIfExists(client.cpf, client.email);

        if (!clientExists) {
            let registeredClient: Client = await this.clientRepository.save(newClient);

            return registeredClient;
        }

        return null;
    }
    
    async getAll(): Promise<Client[] | null> {
        const clients: Client[] | null = await this.clientRepository.getAll();

        return clients;
    }

    async getById(id: number): Promise<Client | null> {
        const client: Client | null = await this.clientRepository.getById(id);

        return client;
    }

    async getByParam(identifier: string): Promise<Client | null> {
        const client: Client | null = await this.clientRepository.getByIdentifier(identifier);

        return client;
    }

    async verifyIfExists(cpf: string, email: string): Promise<Client | null> {
        const client: Client | null = await this.clientRepository.getByEmailOrCPF(cpf, email);

        return client;
    }
}