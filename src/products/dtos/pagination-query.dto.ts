import { IsOptional, IsPositive } from "class-validator";
export class PaginationQueryDto {
   
    @IsPositive()
    limit: number;
     
    @IsPositive()
    offset: number;
}
