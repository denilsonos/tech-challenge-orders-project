import { Client } from "../../../domain/entitites/client";
import { ClientRepository } from "../../../domain/ports/repositories/client-repository";
import { GetAllClientsUseCase } from "../../../domain/ports/use-cases/clients/get-all-clients-use-case";

export class GetAllClientsUseCaseImpl implements GetAllClientsUseCase {
  constructor(private readonly clientRepository: ClientRepository) {}

  public async execute(): Promise<Client[]> {
    const clients: Client[] | null = await this.clientRepository.getAll();
    
    return clients;
  }
}
