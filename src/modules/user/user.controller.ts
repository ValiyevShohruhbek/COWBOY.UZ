import { Body, Controller, Delete, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from './login.dto';
import {} from 'cookie-parser';
import { Response } from 'express';

@Controller('admin')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('login')
  async login(
    @Body() data: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.userService.Login(data);
    res.cookie('access_token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return { token };
  }

  @Post('create')
  async create(@Body() data: LoginDto) {
    return await this.userService.create(data);
  }

  @Delete('delete')
  async delete(@Body() data: string) {
    return await this.userService.delete(data);
  }
}
