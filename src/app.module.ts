import { Module } from '@nestjs/common';
import { CoreModule } from './modules/core/core.module';
import { UserModule } from './modules/user/user.module';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [CoreModule, UserModule, ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
