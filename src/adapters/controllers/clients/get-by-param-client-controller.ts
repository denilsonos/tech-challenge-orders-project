import { FastifyRequest } from "fastify";
import { z } from "zod";
import { Controller } from "../../gateways/controllers/controller";
import { Client } from "../../../core/entities/client-orm";
import { ClientUseCase } from "../../gateways/use-cases/client-use-case";
import { BadRequestException } from "../../../core/entities/exceptions";

export class GetByParamController implements Controller {

    constructor(private readonly clientUseCase: ClientUseCase) { }

    public async execute(params: any,
    ): Promise<any> {

        const result: any = this.validate(params)

        if (!result.success) {
            throw new BadRequestException('Validation error!', result.error.issues)
        }

        const { identifier } = result.data;
        
        const client: Client | null = await this.clientUseCase.getByParam(identifier);
        return client;
    }

    private validate(params: FastifyRequest['params']) {
        const schema = z.object({
            identifier: z.string().or(z.number()) 
        })
        return schema.safeParse(params);
    }
}