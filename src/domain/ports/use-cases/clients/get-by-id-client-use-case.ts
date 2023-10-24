import { Client } from "../../../entitites/client";

export interface GetByIdClientUseCase {
    execute(id: number): Promise<Client | null>
}