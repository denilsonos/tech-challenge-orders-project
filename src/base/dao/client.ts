import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ClientEntity } from "../../core/entities/clients";

@Entity('client')
export class ClientDAO {
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

    static daoToEntity(clientDao: ClientDAO): ClientEntity{
        return new ClientEntity(clientDao.cpf, clientDao.email, clientDao.name, clientDao.id);
    }

    static daosToEntities(clientDaos: ClientDAO[]): ClientEntity[] {
        
        const listEntities: ClientEntity[] = []; 

        clientDaos.forEach(clientDao => {
            listEntities.push(ClientDAO.daoToEntity(clientDao))
        });
        
        return listEntities;
    }
}