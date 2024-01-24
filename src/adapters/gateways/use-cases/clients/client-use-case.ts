import { Client } from "../../../../core/entities/client";
export interface ClientUseCase {
    create(
      client: { cpf: string; email: string, name: string }
    ): Promise<Client | null>;
    getAll(): Promise<Client[] | null>;
    getById(id: number): Promise<Client | null>;
    getByParam(identifier: string): Promise<Client | null>;
    verifyIfExists(cpf: string, email: string): Promise<Client | null>;
}