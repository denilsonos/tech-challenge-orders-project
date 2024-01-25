import { ClientDAO } from '../../../base/daos/client'
import { Client } from '../../../core/entities/client-orm'

export interface ClientRepository {
  save(client: Client): Promise<Client>
  getAll(): Promise<ClientDAO[]>
  getById(id: number): Promise<Client | null>
  getByEmailOrCPF(email: string, cpf: string): Promise<Client | null>
  getByEmailOrCPF(email: string, cpf: string): Promise<Client | null>
  getByIdentifier(identifier: string | number): Promise<ClientDAO | null>
}
