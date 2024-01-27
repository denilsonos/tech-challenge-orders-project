import { ClientDTO } from "../../../base/dto/client";
import { OrderDTO } from "../../../base/dto/order";

export interface Order {
    create(client: ClientDTO): Promise<OrderDTO>;
    find(): Promise<OrderDTO[]>;
    get(identifier: any): Promise<OrderDTO>;
    update(identifier: any): Promise<OrderDTO>;
}