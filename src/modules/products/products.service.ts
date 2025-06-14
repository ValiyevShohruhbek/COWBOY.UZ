import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { PrismaService } from '../core/database/prisma.service';
import { promises as fs } from 'fs';
import { join } from 'path';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createProductDto: CreateProductDto, filename: string) {
    return await this.prisma.products.create({
      data: {
        ...createProductDto,
        price: +createProductDto.price,
        image: filename as string,
      },
    });
  }

  async findAll() {
    const checking = await this.prisma.products.findMany();
    if (!checking) throw new NotFoundException('Not found');
    return checking;
  }

  async findOne(id: number) {
    const checking = await this.prisma.products.findFirst({ where: { id } });
    if (!checking) throw new NotFoundException('Not found');
    return checking;
  }

  async remove(id: number) {
    const product = await this.prisma.products.findFirst({ where: { id } });
    if (!product) throw new NotFoundException('Product Not Found');

    // const filePath = join(__dirname, '../../../uploads', product.image);
    const filePath = join(process.cwd(), 'uploads', product.image);

    try {
      await fs.unlink(filePath);
    } catch (e) {
      console.error('Failed to delete image:', e);
      throw new InternalServerErrorException('Image not delete');
    }

    await this.prisma.products.delete({ where: { id } });
    return { message: 'success' };
  }
}
