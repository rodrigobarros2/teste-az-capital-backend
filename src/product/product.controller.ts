import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() data: CreateProductDto) {
    return this.productService.create(data);
  }

  @Get()
  async searchProducts(@Query() queryParams: any) {
    return await this.productService.searchProducts(queryParams);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
