import { Client } from "../../../entitites/client";

export interface GetByEmailClientUseCase {
    execute(email: string): Promise<Client | null>
}