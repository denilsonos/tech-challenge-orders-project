import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ClientEntity } from "../../adapters/gateways/controllers/client";

@Entity('client')
export class ClientDAO {
    //TODO: Separação de entidades (orm e entidades para useCase)
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    public id!: number

    @Column({ type: 'varchar', name: 'cpf' })
    public cpf!: string

    @Column({ type: 'varchar', name: 'email' })
    public email!: string

    @Column({ type: 'varchar', name: 'name' })
    public name!: string

    constructor(cpf: string, email: string, name: string) {
        this.cpf = cpf;
        this.email = email;
        this.name = name;
    }

    daoToEntity(): ClientEntity{
        return new ClientEntity(this.cpf, this.email, this.name, this.id);
    }

    static daosToEntities(clientDaos: ClientDAO[]): ClientEntity[] {
        
        const listEntities: ClientEntity[] = []; 

        clientDaos.forEach(clientDao => {
            listEntities.push(clientDao.daoToEntity())
        });
        
        return listEntities;
    }
}