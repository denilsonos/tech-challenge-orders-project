import { Client } from '../../../core/entities/client'

export interface ClientRepository {
  save(client: Client): Promise<Client>
  getAll(): Promise<Client[]>
  getById(id: number): Promise<Client | null>
  getByEmailOrCPF(email: string, cpf: string): Promise<Client | null>
  getByEmailOrCPF(email: string, cpf: string): Promise<Client | null>
  getByIdentifier(identifier: string | number): Promise<Client | null>
}
