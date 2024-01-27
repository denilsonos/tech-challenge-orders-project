import { DataSource } from "typeorm";
import { ClientDTO } from "../../../base/dto/client";
import { Order } from "../../gateways/controllers/order";
import { z } from "zod";
import { BadRequestException } from "../../../core/entities/exceptions";

export class OrderController implements Order {

    constructor(readonly database: DataSource){}

    async create(bodyParams: unknown): Promise<void> {
        const schema = z.object({
            items: z
              .array(
                z.object({
                  itemId: z.number(),
                  quantity: z.number(),
                }),
              )
              .nonempty(),
            clientId: z.number().optional(),
          })
        
        const result = schema.safeParse(bodyParams)

        if (!result.success) {
            throw new BadRequestException('Validation error!', result.error.issues)
        }


        
        throw new Error("Method not implemented.");
    }

    async find(): Promise<ClientDTO[]> {
        throw new Error("Method not implemented.");
    }

    async get(identifier: any): Promise<ClientDTO> {
        throw new Error("Method not implemented.");
    }

    async update(identifier: any): Promise<ClientDTO> {
        throw new Error("Method not implemented.");
    }

    private validate(bodyParams: unknown) {
        
      }
}