import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('client')
export class Client {
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
}