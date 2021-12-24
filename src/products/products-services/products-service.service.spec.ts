import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getCustomRepositoryToken, getRepositoryToken } from '@nestjs/typeorm';
import exp from 'constants';
import { type } from 'os';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import { ProductEntity } from '../entities/product.entity';
import { RatingEntity } from '../entities/rating.entity';
import { ProductsService } from './products-service.service';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createRepository = <T = any>(): MockRepository<T> => (
  {
    find:jest.fn(),
    findOne: jest.fn(),
    create: jest.fn()
  }
)

describe('ProductsServicesService', () => {
  let service: ProductsService;
  let productRepository : MockRepository
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService,
        { provide: getRepositoryToken(ProductEntity), useValue: createRepository()},
        { provide: getRepositoryToken(RatingEntity), useValue: createRepository() }],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    productRepository = module.get<MockRepository>(getRepositoryToken(ProductEntity))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('when product with id exists', () => {
      it('should return the product object', async () => {
         const productId = '1';
         const expectProduct = {};

         productRepository.findOne.mockReturnValue(expectProduct);
         const product = await service.findOne(productId);
         console.log(product);
         expect(product).toEqual(expectProduct);
      })
    });
    describe('otherwise', () => {
      it('should throw the "NotFoundException"', () => {
        const productId = '1';
        productRepository.findOne.mockReturnValue(undefined)
        try {
          service.findOne(productId)
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
          expect(error.message).toEqual(`product #${productId} not found`)
        }
      })
    })
  });

  describe('find', () => {
    describe('when products exists', () => {
      it('should return the product object', async () => {
         const paginationQueryDto = {"limit":10,"offset":0};
         const expectProduct = [];
         productRepository.findOne.mockReturnValue(expectProduct);
         const product = await service.findAll(paginationQueryDto);      
         expect(product).toEqual(expectProduct);
      })
    }); 
  });

});
