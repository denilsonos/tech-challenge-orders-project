import { DataSource } from "typeorm";
import { Client, ClientEntity } from "../../gateways/controllers/client";
import { ClientParams } from "../../gateways/dtos/create-clients-params";
import { ClientUseCaseImpl } from "../../../core/use-cases/client/client-use-case";
import { ClientRepository } from "../../gateways/repositories/client-repository";
import { ClientRepositoryImpl } from "../../repositories/client-repository";

export class ClientController implements Client {
    private clientUseCase: ClientUseCaseImpl;
    private clientRepository: ClientRepository;
    
    //TODO: Alterar o database para uma interface
    constructor(readonly database: DataSource) {
        this.clientRepository = new ClientRepositoryImpl(database);
        this.clientUseCase = new ClientUseCaseImpl(this.clientRepository);
    }

    create(client: ClientParams): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async getAll(): Promise<ClientEntity[]> {
        const clients: ClientEntity[] = await this.clientUseCase.getAll();

        return clients;
    }
    
    getById(id: number): Promise<Client | null> {
        throw new Error("Method not implemented.");
    }
    getByParam(identifier: string): Promise<Client | null> {
        throw new Error("Method not implemented.");
    }
} 