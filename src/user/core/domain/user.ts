
export interface IUser {
    name: string;
    email: string;
    cpf: string;
}

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