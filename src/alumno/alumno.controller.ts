import {
  Controller,
  Body,
  Get,
  Post,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { AlumnoService } from './alumno.service';
import { CrearAlumno } from './dto/alumno.dto';
import { Alumno } from './alumno.entity';

@Controller('alumno')
export class AlumnoController {
  constructor(private alumnoService: AlumnoService) {}

  @Post('/registrar')
  async registrarAlumno(@Body() alumno: CrearAlumno) {
    return await this.alumnoService.registrarAlumno(alumno);
  }

  @Get('/obtener')
  async obtenerAlumnos() {
    return await this.alumnoService.obtenerAlumnos();
  }

  @Get('/obtener/:id')
  async obtenerAlumno(@Param('id', ParseIntPipe) id: number) {
    return await this.alumnoService.obtenerAlumno(id);
  }
}
