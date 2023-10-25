import { Client } from "../../../entitites/client";

export interface GetByIdClientUseCase {
    execute(id: number | undefined): Promise<Client | null>
}