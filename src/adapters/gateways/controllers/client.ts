import { ClientParams as ClientDTO } from "../../../base/dto/generic/create-clients-params";
export interface Client {
    create(client: ClientDTO): Promise<void>;
    getAll(): Promise<ClientDTO[]>;
    getByParam(identifier: any): Promise<ClientDTO>;
}