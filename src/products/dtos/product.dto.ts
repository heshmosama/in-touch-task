import { IsArray, IsNumber, IsOptional, IsString } from "class-validator"; 
import { RatingDto } from "./rating.dto";

export class ProductDto {
    @IsNumber()
    @IsOptional()
    readonly id:number;

    @IsString()
    readonly name:string;

    @IsString()
    readonly brand:string;

    @IsString()
    readonly type:string;

    @IsNumber()
    readonly price:number;

    @IsString()
    @IsOptional()
    readonly description:string;   
    
    @IsArray()
    @IsOptional()
    rating:RatingDto[]

   
}
