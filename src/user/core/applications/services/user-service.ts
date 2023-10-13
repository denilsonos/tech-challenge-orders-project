import { User } from "../../../adapters/driver/user-entity";
import { UserRepository } from "../../../adapters/driver/user-repository";
import { IUser } from "../../domain/user";

export class UserService {

    constructor(private userRepository: UserRepository) { }

    async create(user: User): Promise<void> {
        try {
            await this.verifyIfUserExists(user.email, user.cpf);

            const newUser: IUser = {
                cpf: user.cpf,
                email: user.email,
                name: user.name
            }
            await this.userRepository.create(newUser)
        } catch (error) {
            // TODO Throw new HTTPException
        }
    }

    async getAll(): Promise<User[]> {

        try {
            const users = await this.userRepository.getAll();

            if (!users || users.length === 0) {
                // TODO Throw new HTTPException
            }

            return users;
        } catch (error) {
            // TODO Throw new HTTPException
        }
    }

    async getByCPF(cpf: string): Promise<User> {
        try {
            const user = await this.userRepository.getByCPF(cpf);

            if (!user) {
                // TODO Throw new HTTPException
            }

            return user;
        } catch (error) {
            // TODO Throw new HTTPException
        }
    }

    async getByEmail(email: string): Promise<User> {
        try {
            const user = await this.userRepository.getByEmail(email);

            if (!user) {
                // TODO Throw new HTTPException
            }

            return user;
        } catch (error) {
            // TODO Throw new HTTPException
        }
    }

    async getByEmailOrCPF(email: string = "", cpf: string = ""): Promise<User> {
        try {
            const user = await this.userRepository.getByEmailOrCPF(email, cpf);

            if (!user) {
                // TODO Throw new HTTPException
            }

            return user;
        } catch (error) {
            // TODO Throw new HTTPException
        }
    }

    async getById(id: number): Promise<User> {
        try {
            const user = await this.userRepository.getById(id);

            if (!user) {
                // TODO Throw new HTTPException
            }

            return user;
        } catch (error) {
            // TODO Throw new HTTPException
        }
    }

    async verifyIfUserExists(email: string, cpf: string) {
        try {
            const user = this.userRepository.getByEmailOrCPF(email, cpf);
            if (user) {
                // TODO Throw new HTTPException
            }
        } catch (error) {
            // TODO Throw new HTTPException
        }
    }
}