import { ClientParams as ClientDTO } from "../dtos/create-clients-params";

//TODO: Teste de uso de entidade
export class ClientEntity {
    public id: number
    public cpf: string
    public email: string
    public name: string

    constructor(cpf: string, email: string, name: string, id: number) {
        this.id = id;
        this.cpf = cpf;
        this.email = email;
        this.name = name;
    }
}


export interface Client {
    create(client: ClientDTO): Promise<void>;
    getAll(): Promise<ClientEntity[]>;
    getById(id: number): Promise<Client | null>;
    getByParam(identifier: string): Promise<Client | null>;
}