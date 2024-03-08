import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtAuthGuard } from "src/auth/strategies/jwt/jwt-auth.guard";
import { FindUserDto } from "./dto/find-user.dto";
import { HashService } from "src/hash/hash.service";
import { WishesService } from "src/wishes/wishes.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller('users')
@UseGuards(JwtAuthGuard) 
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashService: HashService,
    private readonly wishesService: WishesService
    ) {}

  @Post() //Создание пользователя
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  

  @Get('me') //Получение данных собственного профиля
  findMe(@Param() username: { username: string }) {
    return this.usersService.findOne(
      {
        where: username,
        select: {
          id: true,
          username: true,
          about: true,
          avatar: true,
          createdAt: true,
          updatedAt: true,
        },
      }
    );
  }

  @Patch("me")
  async update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    let hashedPassword: string;
    if (updateUserDto.password) {
      hashedPassword = await this.hashService.hash(updateUserDto.password);
      updateUserDto.password = hashedPassword;
    }
    return this.usersService.updateOne(+req.user.id, updateUserDto);
  }
  

//Получение списка союственных желаний
  @Get("me/wishes")
  async getMyWishes(@Request() req) { 
    console.log(req)    
    const user = await this.usersService.findOne({
      where: {
        id: +req.user.id,
      },
      relations: {
        wishes: true,
      },
      select: {
        wishes: true,
      },
    });
    console.log(user)
    return user.wishes;
  }

    //Поиск пользователя 
  @Get(":username")
  async findOne(@Param() username: { username: string }) {
    return this.usersService.findOne({
      where: username,
      select: {
        id: true,
        username: true,
        about: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  @Get(":username/wishes")
  async getWishes(@Param() username: { username: string }) {
    const userWishes = await this.usersService.findOne({
      where: username,
      relations: {
        wishes: true,
      },
      select: {
        wishes: true,
      },
    });
    return userWishes.wishes;
  }

  @Post("find")
  async findMany(@Body() reqBody: FindUserDto) {
    return this.usersService.findAll({
      where: [{ username: reqBody.query }, { email: reqBody.query }],
      select: {
        id: true,
        username: true,
        about: true,
        avatar: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }



}




  