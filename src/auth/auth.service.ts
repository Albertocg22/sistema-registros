import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coordinador } from '../coordinador/coordinador.entity';
import { Alumno } from '../alumno/alumno.entity';
import { Repository } from 'typeorm';
import { AutenticarCoordinador } from '../coordinador/dto/coordinador.dto';
import { AutenticarAlumno } from '../alumno/dto/alumno.dto';
import { JwtService } from '@nestjs/jwt';

const bcrypt = require('bcrypt');
const saltRounds = 10;

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Coordinador)
    private coordinadorRepository: Repository<Coordinador>,
    @InjectRepository(Alumno)
    private alumnoRepository: Repository<Alumno>,
    private jwtService: JwtService,
  ) {}

  async autenticarCoordinador(coordinador: AutenticarCoordinador) {
    const buscarCoordinador = await this.coordinadorRepository.findOne({
      where: { correoElectronico: coordinador.correoElectronico },
    });
    if (!buscarCoordinador) {
      throw new HttpException(
        'El coordinador no existe',
        HttpStatus.BAD_REQUEST,
      );
    }
    const verificarClave = await bcrypt.compare(
      coordinador.claveAcceso,
      buscarCoordinador.claveAcceso,
    );
    if (!verificarClave) {
      throw new HttpException(
        'La clave no es correcta',
        HttpStatus.BAD_REQUEST,
      );
    }
    const payload = {
      id: buscarCoordinador.id,
      correoElectronico: buscarCoordinador.correoElectronico,
      rol: buscarCoordinador.rol,
    };
    const token = await this.jwtService.sign(payload);
    const nombreCompleto =
      buscarCoordinador.nombre + ' ' + buscarCoordinador.apellidos;
    const correoElectronico = buscarCoordinador.correoElectronico;
    return {
      token,
      nombre: nombreCompleto,
      correoElectronico,
    };
  }

  async autenticarAlumno(alumno: AutenticarAlumno) {
    const buscarAlumno = await this.alumnoRepository.findOne({
      where: { correoElectronico: alumno.correoElectronico },
    });
    if (!buscarAlumno) {
      throw new HttpException('El alumno no existe', HttpStatus.BAD_REQUEST);
    }
    const verificarClave = await bcrypt.compare(
      alumno.claveAcceso,
      buscarAlumno.claveAcceso,
    );
    if (!verificarClave) {
      throw new HttpException(
        'La clave no es correcta',
        HttpStatus.BAD_REQUEST,
      );
    }
    const payload = {
      id: buscarAlumno.id,
      correoElectronico: buscarAlumno.correoElectronico,
      rol: buscarAlumno.rol,
    };

    const token = await this.jwtService.sign(payload);
    const nombreCompleto = buscarAlumno.nombre + ' ' + buscarAlumno.apellidos;
    const correoElectronico = buscarAlumno.correoElectronico;
    return {
      token,
      nombre: nombreCompleto,
      correoElectronico,
    };
  }
}
