import { User } from "./user.entity";
import { UserService } from "./user.service";




export class UserController {

    constructor(private userService: UserService) {}

    async create(user: User){
        const data = await this.userService.create(user);

        // TODO HttpGenericResponse
    }

    async getAll() {
        const data = await this.userService.getAll();

        // TODO HttpGenericResponse
    }

    async getByCPF(cpf: string) {
        const data = await this.userService.getByCPF(cpf);

        // TODO HttpGenericResponse
    }

    async getByEmail(email: string){
        const data = await this.userService.getByEmail(email);

        // TODO HttpGenericResponse
    }

    async getByEmailOrCPF(email: string, cpf: string){
        const data = await this.userService.getByEmailOrCPF(email, cpf);

        // TODO HttpGenericResponse
    }
    async getById(id: number) {
        const data = await this.userService.getById(id);

        // TODO HttpGenericResponse
    }
}