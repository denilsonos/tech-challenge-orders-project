import { User } from "../out/user-entity";
import { UserService } from "../../core/applications/services/user-service";
import { UserUseCase } from "../../core/domain/ports/in/user.use-case";

export class UserController {

    constructor(private readonly userUseCase: UserUseCase) {}

    async create(user: User){
        const data = await this.userUseCase.create(user);

        // TODO HttpGenericResponse
    }

    async getAll() {
        const data = await this.userUseCase.getAll();

        // TODO HttpGenericResponse
    }

    async getByCPF(cpf: string) {
        const data = await this.userUseCase.getByCPF(cpf);

        // TODO HttpGenericResponse
    }

    async getByEmail(email: string){
        const data = await this.userUseCase.getByEmail(email);

        // TODO HttpGenericResponse
    }

    async getByEmailOrCPF(email: string, cpf: string){
        const data = await this.userUseCase.getByEmailOrCPF(email, cpf);

        // TODO HttpGenericResponse
    }
    async getById(id: number) {
        const data = await this.userUseCase.getById(id);

        // TODO HttpGenericResponse
    }
}