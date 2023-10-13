import { User } from '../../user';

export abstract class UserPersistencePort {
  abstract create(user: User): Promise<void>;
  abstract getAll(): Promise<User[]>;
  abstract getByCPF(cpf: string): Promise<User>;
  abstract getByEmail(email: string): Promise<User>;
  abstract getByEmailOrCPF(email: string, cpf: string): Promise<User>;
  abstract getById(id: number): Promise<User>;
}
