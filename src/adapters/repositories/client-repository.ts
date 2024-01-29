import { DataSource } from "typeorm"
import { ClientRepository } from "../gateways/repositories/client-repository";
import { ClientDAO } from "../../base/dao/client";
import { DbConnection } from "../gateways/interfaces/db-connection";

export class ClientRepositoryImpl implements ClientRepository {
    //TODO: Alterar o database para uma interface
    constructor(private readonly database: DbConnection) { }

    private async init(): Promise<DataSource>{
        return await this.database.getConnection()
    }

    async save(client: ClientDAO): Promise<ClientDAO> {
        const dbConn = await this.init()
        const repository = dbConn.getRepository(ClientDAO);

        const registeredClient = await repository.save(client);

        return registeredClient;
    }
    async getById(id: number): Promise<ClientDAO | null> {
        let client: ClientDAO | null;
        const dbConn = await this.init()
        const repository = dbConn.getRepository(ClientDAO);

        client = await repository.findOne({ where: { id } });
        return client;
    }
    async getAll(): Promise<ClientDAO[]> {
        let clients: ClientDAO[] = [];
        const dbConn = await this.init()
        const repository = dbConn.getRepository(ClientDAO);

        clients = await repository.find();

        return clients;
    }
    async getByEmailOrCPF(cpf: string, email: string): Promise<ClientDAO | null> {
        let client: ClientDAO | null;
        const dbConn = await this.init()
        const repository = dbConn.getRepository(ClientDAO);
        
        client = await repository
            .createQueryBuilder('client')
            .where('client.email = :email OR client.cpf = :cpf', { email, cpf })
            .getOne()

        return client;
    }

    async getByIdentifier(identifier: string | number): Promise<ClientDAO | null> {        
        const dbConn = await this.init()
        const repository = dbConn.getRepository(ClientDAO);
        
        const client: ClientDAO | null = await repository
            .createQueryBuilder('client')
            .where('client.id = :id OR client.email = :email OR client.cpf = :cpf', { id: identifier, email: identifier, cpf: identifier })
            .getOne()

        return client;
    }
}