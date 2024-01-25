import { ClientDAO } from '../../../base/daos/client'

export interface ClientRepository {
  save(client: ClientDAO): Promise<ClientDAO>
  getAll(): Promise<ClientDAO[]>
  getById(id: number): Promise<ClientDAO | null>
  getByEmailOrCPF(email: string, cpf: string): Promise<ClientDAO | null>
  getByIdentifier(identifier: string | number): Promise<ClientDAO | null>
}
