import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { RatingEntity } from './entities/rating.entity';
import { ProductsController } from './products-controller/products.controller';
import { ProductsService } from './products-services/products-service.service';

@Module({
    imports:[TypeOrmModule.forFeature([ProductEntity,RatingEntity])],
    controllers:[ProductsController],
    providers:[ProductsService]
})
export class ProductsModule {}
