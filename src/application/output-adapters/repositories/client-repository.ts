import { DataSource } from "typeorm"
import { ClientRepository } from "../../../domain/ports/repositories/client-repository"
import { Client } from "../../../domain/entitites/client"


export class ClientRepositoryImpl implements ClientRepository {
    constructor(private readonly database: DataSource) { }

    async save(client: Client): Promise<Client> {
        const repository = this.database.getRepository(Client);

        const registeredClient = await repository.save(client);

        return registeredClient;
    }
    async getAll(): Promise<Client[]> {
        let clients: Client[] = [];

        const repository = this.database.getRepository(Client);

        clients = await repository.find();

        return clients;
    }
    async getById(id: number): Promise<Client | null> {
        let client: Client | null;

        const repository = this.database.getRepository(Client);

        client = await repository.findOne({ where: { id } });
        return client;
    }

    async getByCPF(cpf: string): Promise<Client | null> {
        let client: Client | null;

        const repository = this.database.getRepository(Client);
        client = await repository.findOne({ where: { cpf } })
        return client;
    }
    async getByEmail(email: string): Promise<Client | null> {
        let client: Client | null;
        const repository = this.database.getRepository(Client);

        client = await repository.findOne({ where: { email } })
        return client;
    }
    async getByEmailOrCPF(cpf: string, email: string): Promise<Client | null> {
        let client: Client | null;

        const repository = this.database.getRepository(Client);
        
        client = await repository
            .createQueryBuilder('client')
            .where('client.email = :email OR client.cpf = :cpf', { email, cpf })
            .getOne()

        return client;
    }
}