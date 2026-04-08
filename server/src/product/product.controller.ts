import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('api/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  /**
   * Obtiene todas las categorías disponibles
   * @return Lista de categorías
   */
  @Get('categories')
  async getCategories() {
    return this.productService.getAllCategories();
  }

  /**
   * Obtiene productos por categoría con paginación
   * @param categoryName Nombre de la categoría
   * @param page Número de página (query, default: 1)
   * @param limit Productos por página (query, default: 10, max: 100)
   * @return Lista de productos con información de paginación
   */
  @Get('category/:categoryName')
  async getProductsByCategory(
    @Param('categoryName') categoryName: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '100',
  ) {
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, Math.min(100, parseInt(limit, 10) || 10));
    return this.productService.getProductsByCategory(categoryName, pageNum, limitNum);
  }

  /**
   * Crea una nueva categoría (protegido por JWT)
   * @param createCategoryDto DTO con nombre y descripción de la categoría
   * @return La categoría creada
   */
  @Post('create-category')
  @UseGuards(JwtAuthGuard)
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.productService.createCategory(createCategoryDto);
  }

  /**
   * Crea un nuevo producto (protegido por JWT)
   * @param createProductDto DTO con datos del producto a crear
   * @return El producto creado
   */
  @Post('create-product')
  @UseGuards(JwtAuthGuard)
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }
}
