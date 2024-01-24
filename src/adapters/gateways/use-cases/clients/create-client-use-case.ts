import { Client } from "../../../entitites/client";

export interface CreateClientUseCase {
    execute(
      client: { cpf: string; email: string, name: string }
    ): Promise<Client | null>
    verifyIfExists(cpf: string, email: string): Promise<Client | null>
}