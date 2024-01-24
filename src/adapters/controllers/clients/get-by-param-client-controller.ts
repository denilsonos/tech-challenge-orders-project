import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { Controller } from "../../gateways/controllers/controller";
import { Client } from "../../../core/entities/client";
import { ClientUseCase } from "../../gateways/use-cases/client-use-case";
import { BadRequestException, NotFoundException } from "../../../core/entities/exceptions";

export class GetByParamController implements Controller {

    constructor(private readonly clientUseCase: ClientUseCase) { }

    public async execute(params: any,
    ): Promise<any> {

        const result: any = this.validate(params)

        if (!result.success) {
            // return reply.status(400).send({
            //     message: 'Validation error!',
            //     issues: result.error.issues,
            // })
            throw new BadRequestException('Validation error!', result.error.issues)
        }

        const { identifier } = result.data;
        
        const client: Client | null = await this.clientUseCase.getByParam(identifier);

        if(!client?.id) {
            // return reply.status(404).send({
            //     message: "Client not found!"
            // })
            throw new NotFoundException('Client not found!')
        }

        // return reply.status(200).send({
        //     message: "Client found!",
        //     client
        // })
    }

    private validate(params: FastifyRequest['params']) {
        const schema = z.object({
            identifier: z.string().or(z.number()) 
        })
        return schema.safeParse(params);
    }
}