import { User } from '../../user';

export abstract class UserPersistencePort {
  abstract create(user: User): Promise<void>;
  abstract getById(id: number): Promise<User>;
  abstract getByEmail(email: string): Promise<User>;
  abstract getByCPF(cpf: string): Promise<User>;
  abstract getAll(): Promise<User[]>;
  abstract getByEmailOrCpf(email: string, cpf: string): Promise<User>;
}
