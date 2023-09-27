import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Alumno } from './alumno.entity';
import { Repository } from 'typeorm';
import { CrearAlumno } from './dto/alumno.dto';

const bcrypt = require('bcrypt');
const saltRounds = 10;

@Injectable()
export class AlumnoService {
  constructor(
    @InjectRepository(Alumno) private alumnoRepository: Repository<Alumno>,
  ) {}

  async registrarAlumno(alumno: CrearAlumno) {
    const buscarAlumno = await this.alumnoRepository.findOne({
      where: { correoElectronico: alumno.correoElectronico },
    });
    if (buscarAlumno) {
      throw new HttpException('El alumno ya existe', HttpStatus.BAD_REQUEST);
    }

    const nuevoAlumno = this.alumnoRepository.create(alumno);

    const encriptarClave = await new Promise((resolve, reject) => {
      bcrypt.hash(nuevoAlumno.claveAcceso, saltRounds, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });

    nuevoAlumno.claveAcceso = encriptarClave as string;
    await this.alumnoRepository.save(nuevoAlumno);
    return nuevoAlumno;
  }

  async obtenerAlumnos() {
    const alumnos = await this.alumnoRepository.find();
    return alumnos;
  }

  async obtenerAlumno(id: number) {
    const alumno = await this.alumnoRepository.findOne({
      where: { id },
    });
    if (!alumno) {
      throw new HttpException('No se encontró al alumno', HttpStatus.NOT_FOUND);
    }
    return alumno;
  }

  async actualizarAlumno(id: number, alumno: CrearAlumno) {
    const buscarAlumno = await this.alumnoRepository.findOne({
      where: { id },
    });
    if (!buscarAlumno) {
      throw new HttpException('No se encontró al alumno', HttpStatus.NOT_FOUND);
    }
    await this.alumnoRepository.update(id, alumno);
    const alumnoActualizado = await this.alumnoRepository.findOne({
      where: { id },
    });
    return alumnoActualizado;
  }
}
