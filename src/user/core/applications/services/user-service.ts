import { IUser } from "../../domain/interfaces/user-interface";
import { UserUseCase } from "../../domain/ports/in/user.use-case";
import { UserPersistencePort } from "../../domain/ports/out/user.persistence.ports";
import { User } from "../../domain/user";

export class UserService implements UserUseCase {

    constructor(private userPersistentPort: UserPersistencePort) { }

    async create(user: User): Promise<void> {
        try {
            await this.verifyIfUserExists(user.email, user.cpf);

            const newUser: IUser = {
                cpf: user.cpf,
                email: user.email,
                name: user.name
            }
            await this.userPersistentPort.create(newUser)
        } catch (error) {
            // TODO Throw new HTTPException
        }
    }

    async getAll(): Promise<User[]> {

        try {
            const users = await this.userPersistentPort.getAll();

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
            const user = await this.userPersistentPort.getByCPF(cpf);

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
            const user = await this.userPersistentPort.getByEmail(email);

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
            const user = await this.userPersistentPort.getByEmailOrCPF(email, cpf);

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
            const user = await this.userPersistentPort.getById(id);

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
            const user = this.userPersistentPort.getByEmailOrCPF(email, cpf);
            if (user) {
                // TODO Throw new HTTPException
            }
        } catch (error) {
            // TODO Throw new HTTPException
        }
    }
}