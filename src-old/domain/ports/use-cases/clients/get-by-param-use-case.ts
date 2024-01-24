import { Client } from "../../../entitites/client";

export interface GetByParamClientUseCase {
    execute(identifier: string| number): Promise<Client | null>
}