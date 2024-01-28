import { Client } from "../../../entitites/client";

export interface GetAllClientsUseCase {
    execute(): Promise<Client[]>
}