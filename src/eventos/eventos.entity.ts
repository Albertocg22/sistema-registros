import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import {Coordinador} from '../coordinador/coordinador.entity'

@Entity({ name: 'evento' })
export class Evento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  nombre: string;


  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechainicio: Date;

  @Column({ type: 'datetime'})
  fechafin: Date;


  @Column({ type: 'varchar', length: 100, unique: true })
  lugar: string;

  @ManyToMany(() => Coordinador, coordinador => coordinador.eventos)
  @JoinTable({ name: 'evento_coordinador' })
  coordinadores: Coordinador[];

}
