import { Controller, Post, UseGuards, Request, Body } from "@nestjs/common";
import { LocalAuthGuard } from "./strategies/local/local-auth.guard";
import { AuthService } from "./auth.service";

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  //Вход
  @UseGuards(LocalAuthGuard)
  @Post("/signin")
  async login(@Request() req): Promise<Record<"access_token", string>> {
    return this.authService.login(req.user);
  }

  //Регистрация
  @Post("/signup")
  async register(@Body() reqBody) {
    console.log('Пользователь зарегистрировался');
    return this.authService.register(reqBody);
  }
}
