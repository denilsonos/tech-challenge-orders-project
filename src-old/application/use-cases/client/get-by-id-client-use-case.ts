import { Client } from "../../../domain/entitites/client";
import { ClientRepository } from "../../../domain/ports/repositories/client-repository";
import { GetByIdClientUseCase } from "../../../domain/ports/use-cases/clients/get-by-id-client-use-case";

export class GetByIdClientUseCaseImpl implements GetByIdClientUseCase {
  constructor(private readonly clientRepository: ClientRepository) {}

  public async execute(id: number): Promise<Client | null> {
    const client: Client | null = await this.clientRepository.getById(id);
    
    return client;
  }
}