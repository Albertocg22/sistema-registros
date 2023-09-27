import { Module } from '@nestjs/common';
import { AlumnoService } from './alumno.service';
import { AlumnoController } from './alumno.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alumno } from './alumno.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Alumno])],
  providers: [AlumnoService],
  controllers: [AlumnoController],
})
export class AlumnoModule {}
