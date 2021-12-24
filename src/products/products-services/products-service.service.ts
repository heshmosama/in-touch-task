import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import { ProductDto } from '../dtos/product.dto';
import { RatingDto } from '../dtos/rating.dto';
import { ProductEntity } from '../entities/product.entity';
import { RatingEntity } from '../entities/rating.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
        @InjectRepository(RatingEntity)
        private readonly ratingRepository: Repository<RatingEntity>
    ) { }

    findAll(pagninationQuery: PaginationQueryDto) {
        const { limit, offset } = pagninationQuery;
        return this.productRepository.find({
            relations: ['rating'],
            skip: offset,
            take: limit
        })
    }

    async findOne(id: String) {
        const product = await this.productRepository.findOne(+id, {
            relations: ['rating']
        })
        if (!product) {
            throw new NotFoundException(`product #${id} not found`)
        }
        return product;
    }

    async create(product: ProductDto) {
        const productvar = this.productRepository.create({
            ...product
        })
        return await this.productRepository.save(productvar);
    }

    async delete() {
        const entities = await this.productRepository.find({
            relations: ['rating']
        })
        return this.productRepository.remove(entities)
    }

    async createRating(rating: RatingDto) {
        const dto = this.ratingRepository.create(rating)
        return this.ratingRepository.save(dto)
    }


}
