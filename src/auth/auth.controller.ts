import { Controller, Post, Body, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() login: LoginDto) {
    return await this.authService.autenticarCoordinador(login);
  }

  @Post('/loginAlumno')
  async loginAlumno(@Body() login: LoginDto) {
    return await this.authService.autenticarAlumno(login);
  }
}
