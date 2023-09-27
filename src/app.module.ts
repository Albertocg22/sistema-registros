import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoordinadorModule } from './coordinador/coordinador.module';
import { AlumnoModule } from './alumno/alumno.module';
import { Coordinador } from './coordinador/coordinador.entity';
import { Alumno } from './alumno/alumno.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'rmb24',
      database: 'registro_extraDB',
      entities: [Coordinador, Alumno],
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
