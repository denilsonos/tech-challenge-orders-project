import { ClientDTO } from "../../../base/dto/client";

export interface Order {
    create(client: ClientDTO): Promise<void>;
    find(): Promise<ClientDTO[]>;
    get(identifier: any): Promise<ClientDTO>;
    update(identifier: any): Promise<ClientDTO>;
}