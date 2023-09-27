import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coordinador } from './coordinador.entity';
import { Repository } from 'typeorm';
import { CrearCoordinador } from './dto/coordinador.dto';

const bcrypt = require('bcrypt');
const saltRounds = 10;

@Injectable()
export class CoordinadorService {
  constructor(
    @InjectRepository(Coordinador)
    private coordinadorRepository: Repository<Coordinador>,
  ) {}

  async registrarCoordinador(coordinador: CrearCoordinador) {
    const buscarCoordinador = await this.coordinadorRepository.findOne({
      where: { correoElectronico: coordinador.correoElectronico },
    });
    if (buscarCoordinador) {
      throw new HttpException(
        'El coordinador ya existe',
        HttpStatus.BAD_REQUEST,
      );
    }

    const nuevoCoordinador = this.coordinadorRepository.create(coordinador);

    const encriptarClave = await new Promise((resolve, reject) => {
      bcrypt.hash(nuevoCoordinador.claveAcceso, saltRounds, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });

    nuevoCoordinador.claveAcceso = encriptarClave as string;
    await this.coordinadorRepository.save(nuevoCoordinador);
    return nuevoCoordinador;
  }

  async obtenerCoordinadores() {
    const coordinadores = await this.coordinadorRepository.find();
    return coordinadores;
  }

  async obtenerCoordinador(id: number) {
    const coordinador = await this.coordinadorRepository.findOne({
      where: { id },
    });
    if (!coordinador) {
      throw new HttpException(
        'No se encontró al coordinador',
        HttpStatus.NOT_FOUND,
      );
    }
    return coordinador;
  }
}
