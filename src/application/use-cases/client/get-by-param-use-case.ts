import { Client } from "../../../domain/entitites/client";
import { ClientRepository } from "../../../domain/ports/repositories/client-repository";
import { GetByParamClientUseCase } from "../../../domain/ports/use-cases/clients/get-by-param-use-case";

export class GetByParamClientUseCaseImpl implements GetByParamClientUseCase {
  constructor(private readonly clientRepository: ClientRepository) {}

  public async execute(identifier: string): Promise<Client | null> {
    const client: Client | null = await this.clientRepository.getByIdentifier(identifier);
    
    return client;
  }
}
