import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import { ProductDto } from '../dtos/product.dto';
import { RatingDto } from '../dtos/rating.dto';
import { ProductsService } from '../products-services/products-service.service';

@ApiTags()
@Controller('products')
export class ProductsController {
    constructor(private readonly service: ProductsService) { }
    
    @Get()
    findall(@Query() pagninationQuery: PaginationQueryDto) {
        return this.service.findAll(pagninationQuery)
    }

    @Get(':id')
    findProduct(@Param('id') id :String) {
        return this.service.findOne(id)
    }

    @Post()    
    create(@Body() body:ProductDto) {
        console.log(body instanceof ProductDto)
     return   this.service.create(body)
    }

    @Post('rating')    
    createRating(@Body() body:RatingDto) {
     console.log(body instanceof ProductDto)
     return   this.service.createRating(body)
    }

    @Delete()
    delete(){
        return this.service.delete()
    }
}
