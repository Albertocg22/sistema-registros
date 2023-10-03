import { Column, Entity, PrimaryColumn,ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import {Evento } from '../eventos/eventos.entity'
import { Coordinador } from 'src/coordinador/coordinador.entity';

@Entity({ name: 'evento_coordinador' })
export class evento_coordinador {


 
    @PrimaryGeneratedColumn()
    id: number;
 
    @ManyToOne(() => Evento, evento => evento.coordinadores)
    evento: Evento;

    @ManyToOne(() => Coordinador, coordinador => coordinador.eventos)
    coordinador: Coordinador;



}