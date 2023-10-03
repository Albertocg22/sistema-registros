import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoordinadorModule } from './coordinador/coordinador.module';
import { AlumnoModule } from './alumno/alumno.module';
import { Coordinador } from './coordinador/coordinador.entity';
import { Alumno } from './alumno/alumno.entity';
import { AuthModule } from './auth/auth.module';
import {Evento} from './eventos/eventos.entity'
import {evento_coordinador} from './eventos/eventos-coordinador.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'registro',
      entities: [Coordinador, Alumno,Evento,evento_coordinador],
      synchronize: true,
    }),
    CoordinadorModule,
    AlumnoModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
