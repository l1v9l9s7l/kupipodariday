import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { WishesModule } from './wishes/wishes.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { OffersModule } from './offers/offers.module';
import { User } from './users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Wish } from './wishes/entities/wish.entity';
import { HashModule } from './hash/hash.module';
import { Wishlist } from './wishlists/entities/wishlist.entity';
import { Offer } from './offers/entities/offer.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',  //тип драйвера
      host: 'localhost', //адрес сервера БД
      port: 5432,        //стандартный порт 5432
      username: 'student', //пароль и логин пользователя из темы про создание юзера
      password: 'student',
      database: 'kupipodariday',//имя бд на которую выдавали доступы
      entities: [User, Wish, Wishlist, Offer], //сущности описывающие бд, добавим их позже
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    WishesModule,
    WishlistsModule,
    OffersModule,
    HashModule
  ],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule {}
