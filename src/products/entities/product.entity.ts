import { type } from "os";
import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RatingEntity } from "./rating.entity";

@Entity()
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
    @Column()
    brand:string;
    @Column()
    type:string;
    @Column()
    price:number;
    @Column()
    description:string;

 
    @OneToMany(() => RatingEntity, rating => rating.product)
    rating:RatingEntity[]
}
