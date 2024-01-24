import { Client } from "../../../core/entities/client";



export interface ClientUseCase {
    create(client: Client): Promise<Client | null>;
    getAll(): Promise<Client[] | null>;
    getById(id: number): Promise<Client | null>;
    getByParam(identifier: string): Promise<Client | null>;
}