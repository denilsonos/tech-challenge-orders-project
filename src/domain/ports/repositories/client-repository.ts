import { Client } from '../../entitites/client'

export interface ClientRepository {
  save(client: Client): Promise<Client>
  getAll(): Promise<Client[]>
  getById(id: number): Promise<Client | null>
  getByCPF(cpf: string): Promise<Client | null>
  getByEmail(email: string): Promise<Client | null>
  getByEmailOrCPF(email: string, cpf: string): Promise<Client | null>
}
