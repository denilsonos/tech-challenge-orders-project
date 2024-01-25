import { Client } from "../../../core/entities/client";
import { ClientEntity } from "../controllers/client";
import { ClientParams } from "../dtos/create-clients-params";

export interface ClientUseCase {
    create(client: ClientParams): Promise<void>;
    getAll(): Promise<ClientEntity[] | null>;
    getById(id: number): Promise<Client | null>;
    getByParam(identifier: string): Promise<Client | null>;
}