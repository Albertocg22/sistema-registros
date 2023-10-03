
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evento } from './eventos.entity';
import { CrearEventoDTO } from './dto/evento.dto';

@Injectable()
export class EventosService {
    constructor(
        @InjectRepository(Evento)
        private eventoRepository: Repository<Evento>,
    ) { }
    async crearEvento(crearEvento: CrearEventoDTO) {
        const evento = new Evento();
        evento.nombre = crearEvento.nombre;
        evento.fechainicio = crearEvento.fechainicio;
        evento.fechafin = crearEvento.fechafin;
        evento.lugar = crearEvento.lugar;

        return this.eventoRepository.save(evento);
    }
}
