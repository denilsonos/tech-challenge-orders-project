import { ClientDTO } from "../../../base/dto/client";
import { ClientEntity } from "../../../core/entities/clients";

export interface ClientUseCase {
    create(client: ClientDTO): Promise<void>;
    getAll(): Promise<ClientEntity[]>;
    getById(id: number): Promise<ClientEntity | null>;
    getByParam(identifier: string): Promise<ClientEntity>;
}