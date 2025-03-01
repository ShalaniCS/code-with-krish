import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Inventory{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:String;

    @Column()
    price : number;

    @Column()
    quantity : number;

}