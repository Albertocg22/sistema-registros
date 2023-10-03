import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import {evento_coordinador} from '../eventos/eventos-coordinador.entity'
import { Evento } from 'src/eventos/eventos.entity';

@Entity({ name: 'coordinador' })
export class Coordinador {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  nombre: string;

  @Column({ type: 'varchar', length: 50 })
  apellidos: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  correoElectronico: string;

  @Column({ type: 'varchar', length: 100 })
  claveAcceso: string;

  @Column({ type: 'varchar', length: 50 })
  coordinacion: string;

  @Column({ nullable: true })
  token: string;

  @Column({
    type: 'enum',
    enum: ['ROL_ALUMNO', 'ROL_COORDINADOR', 'ROL_ADMINISTRADOR'],
    default: 'ROL_COORDINADOR',
  })
  rol: string;

  @Column({ type: 'boolean', default: true })
  estatus: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaCreacion: Date;


  @ManyToMany(() => Evento, evento => evento.coordinadores)
  @JoinTable({ name: 'evento_coordinador' })
  eventos: Evento[];
}
