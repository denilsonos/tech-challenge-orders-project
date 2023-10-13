import { User } from "./user.entity";

export interface UserInterface {
    create(user: User): void;
    getAll(): Promise<User[]>;
    getByCPF(cpf: string): Promise<User>;
    getByEmail(email: string): Promise<User>;
    getByEmailOrCPF(email: string, cpf: string): Promise<User>;
    getById(id: number): Promise<User>;
}