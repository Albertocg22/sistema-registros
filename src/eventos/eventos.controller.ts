import {  Body, Controller, Post} from '@nestjs/common';
import {EventosService} from './eventos.service' 
import { CrearEventoDTO } from './dto/evento.dto';

@Controller('eventos')
export class EventosController {
    constructor(private eventosService:EventosService){
    
    }
    @Post('/crear')
    crear(@Body()CrearEventoDTO:CrearEventoDTO){
        return this.eventosService.crearEvento(CrearEventoDTO)
    }
}
