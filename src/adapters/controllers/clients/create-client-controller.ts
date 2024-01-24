import { FastifyRequest, FastifyReply } from "fastify";
import { z } from 'zod'
import { BadRequestException, ConflictException } from "../../../core/entities/exceptions";
import { Controller } from "../../gateways/controllers/controller";
import { ClientUseCase } from "../../gateways/use-cases/clients/client-use-case";
import { Client } from "../../../core/entities/client";

export class CreateClientController implements Controller {

    constructor(private readonly clientUseCase: ClientUseCase) { }

    //TODO: Definir a tipagem dos métodos do controller
    public async execute(params: any): Promise<any> {

        const result = this.validate(params)

        if (!result.success) {
            // return reply.status(400).send({
            //     message: 'Validation error!',
            //     issues: result.error.issues,
            // })

            throw new BadRequestException('Validation error!', result.error.issues)
        }
        const { cpf, email, name } = result.data;
        const registeredClient: Client | null = await this.clientUseCase
            .create({ cpf, email, name });

        if (!registeredClient) {
            throw new ConflictException('Client already exists!')
        }     
    }

    private validate(params: FastifyRequest['body']) {
        //TODO Definir onde deve ficar o cpfValidator no clean arch
        const schema = z.object({
            cpf: z.string()
            .refine(value => this.cpfValidator(value), {
                message: 'CPF invalid!',
            }),
            email: z
            .string()
            .email('This is not a valid email!'),
            name: z.string(),
        })
        return schema.safeParse(params)
    }

    private cpfValidator = (cpf: string): boolean => {

        if (cpf == null) {
            return true;
        }
    
        cpf = cpf.replace(/[^\d]+/g, '');
    
        if (cpf.length !== 11) {
            return false;
        }
    
        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += parseInt(cpf.charAt(i)) * (10 - i);
        }
    
        let mod = sum % 11;
        const digit1 = mod < 2 ? 0 : 11 - mod;
    
        if (parseInt(cpf.charAt(9)) !== digit1) {
            return false;
        }
    
        sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += parseInt(cpf.charAt(i)) * (11 - i);
        }
    
        mod = sum % 11;
        const digit2 = mod < 2 ? 0 : 11 - mod;
    
        if (parseInt(cpf.charAt(10)) !== digit2) {
            return false;
        }
    
        return true;
    }     
}