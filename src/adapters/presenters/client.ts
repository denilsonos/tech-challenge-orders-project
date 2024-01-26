import { ClientDTO } from "../../base/dto/client";
import { ClientEntity } from "../../core/entities/clients";

export class ClientPresenter {

    static EntityToDto(clientEntity: ClientEntity): ClientDTO{
        return new ClientDTO(clientEntity.cpf, clientEntity.email, clientEntity.name);
    }

    static EntitiesToDto(clientEntities: ClientEntity[]): ClientDTO[] {
        
        const listDtos: ClientDTO[] = []; 

        clientEntities.forEach(clientEntity => {
            listDtos.push(ClientPresenter.EntityToDto(clientEntity));
        });
        
        return listDtos;
    }
}