import { Client } from "../../../domain/entitites/client";
import { ClientRepository } from "../../../domain/ports/repositories/client-repository";
import { GetByCpfClientUseCase } from "../../../domain/ports/use-cases/clients/get-by-cpf-client-use-case";

export class GetByCpfClientUseCaseImpl implements GetByCpfClientUseCase {
  constructor(private readonly clientRepository: ClientRepository) {}

  public async execute(cpf: string): Promise<Client | null> {
    const client: Client | null = await this.clientRepository.getByCPF(cpf);
    
    return client;
  }
}
