import { User } from '../../user';
import { UserCommand } from './user.command';

export abstract class UserUseCase {
  abstract create(command: UserCommand): Promise<void>;
  abstract getAll(): Promise<User[]>;
  abstract getByCPF(cpf: string): Promise<User>;
  abstract getByEmail(email: string): Promise<User>;
  abstract getByEmailOrCPF(email: string, cpf: string): Promise<User>;
  abstract getById(id: number): Promise<User>;
}
