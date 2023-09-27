import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'alumno' })
export class Alumno {
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
  carrera: string;

  @Column({ nullable: true })
  token: string;

  @Column({
    type: 'enum',
    enum: ['ROL_ALUMNO', 'ROL_COORDINADOR', 'ROL_ADMINISTRADOR'],
    default: 'ROL_ALUMNO',
  })
  rol: string;

  @Column({ type: 'boolean', default: true })
  estatus: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaCreacion: Date;
}
