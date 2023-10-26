import { Client } from '../../entitites/client'

export interface ClientRepository {
  save(client: Client): Promise<Client>
  getAll(): Promise<Client[]>
  getByEmailOrCPF(email: string, cpf: string): Promise<Client | null>
  getByIdentifier(identifier: string | number): Promise<Client | null>
}
