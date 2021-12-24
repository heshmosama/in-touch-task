import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { ProductDto } from 'src/products/dtos/product.dto';
import { ProductsModule } from 'src/products/products.module';

const product = {
    "name": "coffe 30",
    "brand": "coffe 30",
    "type": "coffe 30",
    "price": 50.0,
    "description": "coffe 30"
};

describe('Products Features (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [ProductsModule, , TypeOrmModule.forRoot(
                {
                    type: 'postgres',
                    host: 'localhost',
                    port: 5433,
                    username: 'postgres',
                    password: 'pass123',
                    database: 'postgres',
                    autoLoadEntities: true,
                    synchronize: true
                })],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe({
            whitelist: true,
            transform: true,
            forbidNonWhitelisted: true,
            transformOptions: {
                enableImplicitConversion: true
            }
        }))
        await app.init();
    });

    it('Create Post', () => {
        return request(app.getHttpServer())
            .post('/products')
            .send(product as ProductDto)
            .expect(HttpStatus.CREATED)
            .then((body) => {
                const expectProduct = jasmine.objectContaining({
                    ...product
              
                });
                expect(body).toEqual(expectProduct)
            })
    })


    beforeAll(async () => {
        await app.close;
    }
    )
});
