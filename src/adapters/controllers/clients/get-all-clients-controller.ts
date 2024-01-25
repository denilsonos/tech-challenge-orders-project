import { Controller } from "../../gateways/controllers/controller";
import { ClientUseCase } from "../../gateways/use-cases/client-use-case";
import { Client } from "../../../core/entities/client-orm";


export class GetAllClientsController implements Controller {

    constructor(private readonly clientUseCase: ClientUseCase) { }

    public async execute(): Promise<Client[] | null> {
        //TODO: Instanciar a repository
        //TODO: Instanciar o useCase
        //TODO: Alterar a entidade, utilizando uma entidade sem vínculo com o orm
        const clients: Client[] | null = await this.clientUseCase.getAll();

        //TODO: Implementar o DAO em uma pasta "base" no mesmo nível de adapters, core e frameworks
        //TODO: Chamar DAO para devolver a resposta

        return clients;
    }
}