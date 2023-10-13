import { User } from "./user.entity";
import { UserInterface } from "./user.interface";
import { AppDataSource } from "../data-source"
import { UserEnum } from "./user.enum";

export class UserRepository implements UserInterface {
    constructor() { }

    async create(user: UserEnum): Promise<void> {
        await AppDataSource
        .createQueryBuilder()
        .insert()
        .values(user)
        .execute();
    }

    async getAll(): Promise<User[]> {
        return await AppDataSource
            .getRepository(User)
            .find();
    }

    async getByCPF(cpf: string): Promise<User> {
        return await AppDataSource
            .getRepository(User)
            .findOneBy({
                cpf,
            });
    }

    async getByEmail(email: string): Promise<User> {
        return await AppDataSource
            .getRepository(User)
            .findOneBy({
                email,
            });
    }

    async getByEmailOrCPF(email: string, cpf: string): Promise<User> {
        return await AppDataSource
            .createQueryBuilder()
            .where('user.email = :email OR user.cpf', { email, cpf })
            .getOne();
    }

    async getById(id: number): Promise<User> {
        return await AppDataSource
            .getRepository(User)
            .findOneBy({
                id,
            });
    }
}