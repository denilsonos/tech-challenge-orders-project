import { Client } from "../gateways/interfaces/client";
import { ClientUseCaseImpl } from "../../core/use-cases/client/client-use-case";
import { ClientRepository } from "../gateways/repositories/client-repository";
import { ClientRepositoryImpl } from "../repositories/client-repository";
import { z } from "zod";
import { BadRequestException } from "../../core/entities/exceptions";
import { cpfValidator } from "./validators/cpf-validatior";
import { ClientDTO } from "../../base/dto/client";
import { ClientEntity } from "../../core/entities/clients";
import { ClientUseCase } from "../gateways/use-cases/client-use-case";
import { ClientPresenter } from "../presenters/client";
import { DbConnection } from "../gateways/db/db-connection";

export class ClientController implements Client {
    private clientUseCase: ClientUseCase;
    private clientRepository: ClientRepository;
    
    constructor(readonly database: DbConnection) {
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

    async getAll(): Promise<ClientDTO[]> {
        const clients: ClientEntity[] = await this.clientUseCase.getAll();
        return ClientPresenter.EntitiesToDto(clients);
    }

    async getByParam(params: unknown): Promise<ClientDTO> {
        
        const schema = z.object({
            identifier: z.string().or(z.number()) 
        })
        const result: any = schema.safeParse(params)

        if (!result.success) {
            throw new BadRequestException('Validation error!', result.error.issues)
        }

        const { identifier } = result.data;
        
        const client: ClientEntity = await this.clientUseCase.getByParam(identifier);
        return ClientPresenter.EntityToDto(client);
    }
} 