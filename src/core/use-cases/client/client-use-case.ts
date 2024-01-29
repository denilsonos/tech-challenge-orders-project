import { ClientUseCase } from "../../../adapters/gateways/use-cases/client-use-case";
import { ClientRepository } from "../../../adapters/gateways/repositories/client-repository";
import { ConflictException, NotFoundException } from "../../entities/exceptions";
import { ClientDAO } from "../../../base/dao/client";
import { ClientDTO } from "../../../base/dto/client";
import { ClientEntity } from "../../entities/clients";

export class ClientUseCaseImpl implements ClientUseCase {

    constructor(private readonly clientRepository: ClientRepository) { }

    async create(client: ClientDTO): Promise<void> {

        const newClient = new ClientDAO(client.cpf, client.email, client.name);

        const clientExists: ClientDAO | null = await this.verifyIfExists(client.cpf, client.email);

        if (clientExists) {
            throw new ConflictException('Client already exists!');
        }
        await this.clientRepository.save(newClient);
    }

    async getAll(): Promise<ClientEntity[]> {
        const clients: ClientDAO[] | null = await this.clientRepository.getAll();

        return ClientDAO.daosToEntities(clients);        
    }

    async getById(id: number): Promise<ClientEntity> {
        const client: ClientDAO | null = await this.clientRepository.getById(id);

        if(!client?.id) {
            throw new NotFoundException('Client not found!')
        }

        return ClientDAO.daoToEntity(client);
    }

    async getByParam(identifier: string): Promise<ClientEntity> {
        const client: ClientDAO | null = await this.clientRepository.getByIdentifier(identifier);

        if(!client?.id) {
            throw new NotFoundException('Client not found!')
        }

        return ClientDAO.daoToEntity(client);
    }

    async verifyIfExists(cpf: string, email: string): Promise<ClientDAO | null> {
        const client: ClientDAO | null = await this.clientRepository.getByEmailOrCPF(cpf, email);

        return client;
    }
}