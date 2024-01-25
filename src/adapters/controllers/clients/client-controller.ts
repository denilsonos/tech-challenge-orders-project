import { DataSource } from "typeorm";
import { Client } from "../../gateways/controllers/client";
import { ClientUseCaseImpl } from "../../../core/use-cases/client/client-use-case";
import { ClientRepository } from "../../gateways/repositories/client-repository";
import { ClientRepositoryImpl } from "../../repositories/client-repository";
import { z } from "zod";
import { BadRequestException } from "../../../core/entities/exceptions";
import { cpfValidator } from "../validators/cpf-validatior";
import { ClientDTO } from "../../../base/dtos/client";
import { ClientEntity } from "../../../core/entities/clients";

export class ClientController implements Client {
    private clientUseCase: ClientUseCaseImpl;
    private clientRepository: ClientRepository;
    
    //TODO: Alterar o database para uma interface
    constructor(readonly database: DataSource) {
        this.clientRepository = new ClientRepositoryImpl(database);
        this.clientUseCase = new ClientUseCaseImpl(this.clientRepository);
    }

    async create(bodyParams: unknown): Promise<void> {
        const schema = z.object({
            cpf: z.string()
                .refine(value => cpfValidator(value), {
                    message: 'CPF invalid!',
                }),
            email: z
                .string()
                .email('This is not a valid email!'),
            name: z.string(),
        })
        const result = schema.safeParse(bodyParams);

        if (!result.success) {
            throw new BadRequestException('Validation error!', result.error.issues);
        }
        const { cpf, email, name } = result.data;

        await this.clientUseCase.create(new ClientDTO(cpf, email, name));
    }

    async getAll(): Promise<ClientEntity[]> {
        const clients: ClientEntity[] = await this.clientUseCase.getAll();

        return clients;
    }
    
    getById(id: number): Promise<Client | null> {
        throw new Error("Method not implemented.");
    }

    //TODO: Alterar a tipagem do identifier
    async getByParam(params: unknown): Promise<ClientEntity> {
        
        const schema = z.object({
            identifier: z.string().or(z.number()) 
        })
        const result: any = schema.safeParse(params)

        if (!result.success) {
            throw new BadRequestException('Validation error!', result.error.issues)
        }

        const { identifier } = result.data;
        
        const client: ClientEntity | null = await this.clientUseCase.getByParam(identifier);
        return client;
    }
} 