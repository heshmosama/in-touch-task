 
import { IsNumber, IsOptional, IsString } from "class-validator";


export class RatingDto {
    @IsNumber()
    @IsOptional()
    id:number;
    @IsNumber()
    rating:number;
    @IsString()
    @IsOptional()
    review:string;  
    @IsNumber()
    productId:number
}
