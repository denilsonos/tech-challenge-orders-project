import { ClientDTO } from "../../../base/dto/client";
import { Order } from "../../gateways/controllers/order";

export class OrderController implements Order {

    constructor(){}

    create(client: ClientDTO): Promise<void> {
        throw new Error("Method not implemented.");
    }
    find(): Promise<ClientDTO[]> {
        throw new Error("Method not implemented.");
    }
    get(identifier: any): Promise<ClientDTO> {
        throw new Error("Method not implemented.");
    }
    update(identifier: any): Promise<ClientDTO> {
        throw new Error("Method not implemented.");
    }
}