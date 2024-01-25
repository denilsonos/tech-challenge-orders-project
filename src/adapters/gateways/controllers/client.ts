import { ClientEntity } from "../../../core/entities/clients";
import { ClientParams as ClientDTO } from "../dtos/create-clients-params";
export interface Client {
    create(client: ClientDTO): Promise<void>;
    getAll(): Promise<ClientEntity[]>;
    getById(id: number): Promise<Client | null>;
    getByParam(identifier: any): Promise<ClientEntity>;
}