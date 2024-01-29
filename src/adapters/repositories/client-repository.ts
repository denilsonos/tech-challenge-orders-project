import { ClientRepository } from "../gateways/repositories/client-repository";
import { ClientDAO } from "../../base/dao/client";
import { DbConnection } from "../gateways/db/db-connection";

export class ClientRepositoryImpl implements ClientRepository {
    constructor(private readonly database: DbConnection) { }

    async save(client: ClientDAO): Promise<ClientDAO> {
        const repository = this.database.getConnection().getRepository(ClientDAO);

        const registeredClient = await repository.save(client);

        return registeredClient;
    }
    async getById(id: number): Promise<ClientDAO | null> {
        let client: ClientDAO | null;
        const repository = this.database.getConnection().getRepository(ClientDAO);

        client = await repository.findOne({ where: { id } });
        return client;
    }
    async getAll(): Promise<ClientDAO[]> {
        let clients: ClientDAO[] = [];
        const repository = this.database.getConnection().getRepository(ClientDAO);

        clients = await repository.find();

        return clients;
    }
    async getByEmailOrCPF(cpf: string, email: string): Promise<ClientDAO | null> {
        let client: ClientDAO | null;
        const repository = this.database.getConnection().getRepository(ClientDAO);
        
        client = await repository
            .createQueryBuilder('client')
            .where('client.email = :email OR client.cpf = :cpf', { email, cpf })
            .getOne()

        return client;
    }

    async getByIdentifier(identifier: string | number): Promise<ClientDAO | null> {        
        const repository = this.database.getConnection().getRepository(ClientDAO);
        
        const client: ClientDAO | null = await repository
            .createQueryBuilder('client')
            .where('client.id = :id OR client.email = :email OR client.cpf = :cpf', { id: identifier, email: identifier, cpf: identifier })
            .getOne()

        return client;
    }
}