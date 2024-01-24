import { ClientUseCase } from "../../../adapters/gateways/use-cases/client-use-case";
import { Client } from "../../entities/client";
import { ClientRepository } from "../../../adapters/gateways/repositories/client-repository";
import { ConflictException, NotFoundException } from "../../entities/exceptions";

export class ClientUseCaseImpl implements ClientUseCase {

    constructor(private readonly clientRepository: ClientRepository) { }

    async create(client: { cpf: string, email: string, name: string }): Promise<void> {

        const newClient = new Client(client.cpf, client.email, client.name);

        const clientExists: Client | null = await this.verifyIfExists(client.cpf, client.email);

        if (clientExists) {
            throw new ConflictException('Client already exists!');
        }
        await this.clientRepository.save(newClient);
    }

    async getAll(): Promise<Client[] | null> {
        const clients: Client[] | null = await this.clientRepository.getAll();

        return clients;
    }

    async getById(id: number): Promise<Client | null> {
        const client: Client | null = await this.clientRepository.getById(id);

        if(!client?.id) {
            throw new NotFoundException('Client not found!')
        }

        return client;
    }

    async getByParam(identifier: string): Promise<Client | null> {
        const client: Client | null = await this.clientRepository.getByIdentifier(identifier);

        if(!client?.id) {
            throw new NotFoundException('Client not found!')
        }

        return client;
    }

    async verifyIfExists(cpf: string, email: string): Promise<Client | null> {
        const client: Client | null = await this.clientRepository.getByEmailOrCPF(cpf, email);

        return client;
    }
}