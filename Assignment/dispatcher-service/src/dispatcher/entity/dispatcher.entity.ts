import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Vehicle{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique:true})
    vehicleNumber:String;

    @Column()
    city:String;

}