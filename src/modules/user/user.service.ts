import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../core/database/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './login.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}
  async Login(data: LoginDto) {
    const checkAdmin = await this.prisma.user.findFirst({
      where: { name: data.name as string },
    });
    if (!checkAdmin) throw new NotFoundException('Admin not found');
    const token = await this.jwt.signAsync({ name: data.name });
    return { token };
  }

  async create(data: LoginDto) {
    const checkAdmin = await this.prisma.user.findFirst({
      where: { name: data.name as string },
    });
    if (checkAdmin) throw new NotFoundException('Admin already exists');
    await this.prisma.user.create({
      data: { name: data.name as string, password: data.password as string },
    });
    return { message: 'success' };
  }
  async delete(name: string) {
    const checkAdmin = await this.prisma.user.findFirst({
      where: { name: name as string },
    });
    if (!checkAdmin) throw new NotFoundException('Admin not found');

    await this.prisma.user.delete({ where: { name } });

    return { message: 'success' };
  }
}
