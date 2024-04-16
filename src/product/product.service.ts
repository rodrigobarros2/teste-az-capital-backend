import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateProductDto) {
    const productExists = await this.prisma.product.findFirst({
      where: {
        id: data.id,
      },
    });

    console.log('productExists', productExists);
    if (!productExists) {
      throw new Error('Product already exists');
    }

    const book = await this.prisma.product.create({
      data,
    });

    return book;
  }

  async searchProducts(queryParams: any) {
    const { name, price, size, color } = queryParams;

    return this.prisma.product.findMany({
      where: {
        name: { contains: name, mode: 'insensitive' },
        price: { equals: price },
        size: { equals: size },
        color: { equals: color },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: string) {
    return `This action updates a #${id} product`;
  }

  remove(id: string) {
    return `This action removes a #${id} product`;
  }
}
