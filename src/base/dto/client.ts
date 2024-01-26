export class ClientDTO {
    public id?: number
    public cpf: string
    public email: string
    public name: string

    constructor(cpf: string, email: string, name: string, id?: number) {
        this.cpf = cpf;
        this.email = email;
        this.name = name;
        this.id = id;
    }
}