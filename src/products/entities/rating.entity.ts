import { type } from "os";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductsController } from "../products-controller/products.controller";
import { ProductEntity } from "./product.entity";

@Entity()
export class RatingEntity {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    rating:number;
    @Column()
    review:string;
    @Column()
    productId:number
    
    @ManyToOne(() => ProductEntity, product => product.rating,{     onDelete: 'CASCADE' })
    @JoinColumn(
        {
            name:'productId',referencedColumnName:'id'
        }
    )
    product:ProductEntity
}
