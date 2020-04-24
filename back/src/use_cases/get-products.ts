import { ProductInterface } from '../domain/product.interface';
import { ProductRepository } from '../domain/product.repository';

export class GetProducts {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(): Promise<ProductInterface[]> {
    return this.productRepository.findAll();
  }
}
