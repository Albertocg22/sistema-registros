import {
  Controller,
  Body,
  Get,
  Post,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CoordinadorService } from './coordinador.service';
import { CrearCoordinador } from './dto/coordinador.dto';
import { Coordinador } from './coordinador.entity';

@Controller('coordinador')
export class CoordinadorController {
  constructor(private coordinadorService: CoordinadorService) {}

  @Post('/registrar')
  async registrarCoordinador(@Body() coordinador: CrearCoordinador) {
    return await this.coordinadorService.registrarCoordinador(coordinador);
  }

  @Get('/obtener')
  async obtenerCoordinadores() {
    return await this.coordinadorService.obtenerCoordinadores();
  }

  @Get('/obtener/:id')
  async obtenerCoordinador(@Param('id', ParseIntPipe) id: number) {
    return await this.coordinadorService.obtenerCoordinador(id);
  }
}
