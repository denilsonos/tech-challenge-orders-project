import { ClientEntity } from "../../adapters/gateways/controllers/client";

export class ClientDTO {
    public cpf: string
    public email: string
    public name: string

    constructor(cpf: string, email: string, name: string) {
        this.cpf = cpf;
        this.email = email;
        this.name = name;
    }

    static EntityToDto(clientEntity: ClientEntity): ClientDTO{
        return new ClientDTO(clientEntity.cpf, clientEntity.email, clientEntity.name);
    }

    static EntitiesToDto(clientEntities: ClientEntity[]): ClientDTO[] {
        
        const listDtos: ClientDTO[] = []; 

        clientEntities.forEach(clientEntity => {
            listDtos.push(ClientDTO.EntityToDto(clientEntity));
        });
        
        return listDtos;
    }
}