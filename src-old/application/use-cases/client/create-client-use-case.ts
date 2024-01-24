import { Client } from "../../../domain/entitites/client";
import { ClientRepository } from "../../../domain/ports/repositories/client-repository";
import { CreateClientUseCase } from "../../../domain/ports/use-cases/clients/create-client-use-case";

export class CreateClientUseCaseImpl implements CreateClientUseCase {
  constructor(private readonly clientRepository: ClientRepository) { }

  public async execute(
    client: { cpf: string, email: string, name: string }
  ): Promise<Client | null> {
    const newClient = new Client(client.cpf, client.email, client.name);

    const clientExists: Client | null = await this.verifyIfExists(client.cpf, client.email);

    if (!clientExists) {
      let registeredClient: Client = await this.clientRepository.save(newClient);

      return registeredClient;
    }

    return null;
  }

  async verifyIfExists(cpf: string, email: string): Promise<Client | null> {
    const client: Client | null = await this.clientRepository.getByEmailOrCPF(cpf, email);

    return client;
  }
}
