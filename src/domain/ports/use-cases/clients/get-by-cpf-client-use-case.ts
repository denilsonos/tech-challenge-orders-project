import { Client } from "../../../entitites/client";

export interface GetByCpfClientUseCase {
    execute(cpf: string): Promise<Client | null>
}