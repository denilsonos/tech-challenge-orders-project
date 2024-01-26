import { ItemDTO } from "../../../base/dto/item";

export interface Item {
    create(item: unknown): Promise<number>;
    delete(id: unknown): Promise<any>;
    update(params: unknown, body: unknown): Promise<any>;
    getById(params: unknown): Promise<ItemDTO>;
    findByParams(query: unknown): Promise<[] | ItemDTO[]>
}