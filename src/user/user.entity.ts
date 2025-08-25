import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    email:string;

    @Column()
    hash: string;

    @Column({nullable: true, type: 'text'})
    refreshToken: string|null;
}
