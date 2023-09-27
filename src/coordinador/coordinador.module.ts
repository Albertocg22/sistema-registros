import { Module } from '@nestjs/common';
import { CoordinadorService } from './coordinador.service';
import { CoordinadorController } from './coordinador.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coordinador } from './coordinador.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coordinador])],
  providers: [CoordinadorService],
  controllers: [CoordinadorController],
})
export class CoordinadorModule {}
