import { Client } from "../../../domain/entitites/client";
import { ClientRepository } from "../../../domain/ports/repositories/client-repository";
import { GetByEmailClientUseCase } from "../../../domain/ports/use-cases/clients/get-by-email-client-use-case";

export class GetByEmailClientUseCaseImpl implements GetByEmailClientUseCase {
  constructor(private readonly clientRepository: ClientRepository) {}

  public async execute(email: string): Promise<Client | null> {
    const client: Client | null = await this.clientRepository.getByEmail(email);
    
    return client;
  }
}
