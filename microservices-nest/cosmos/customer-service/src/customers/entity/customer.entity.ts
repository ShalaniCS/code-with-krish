import { IsNotEmpty, IsOptional } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Customer{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:String;

    @Column()
    email:String;

    @Column()
    address:String;
}