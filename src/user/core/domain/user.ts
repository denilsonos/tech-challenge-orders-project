import { IUser } from "./interfaces/user-interface";

export class User implements IUser {
    name: string;
    email: string;
    cpf: string;
 
    constructor(name: string, email: string, cpf: string) {
        this.name = name;
        this.email = email;
        this.cpf = cpf;
    }
}