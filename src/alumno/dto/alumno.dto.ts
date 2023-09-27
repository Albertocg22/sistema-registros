export class CrearAlumno {
  readonly nombre: string;
  readonly apellidos: string;
  readonly correoElectronico: string;
  readonly claveAcceso: string;
  readonly carrera: string;
  readonly token: string;
  readonly rol: string;
  readonly estatus: boolean;
  readonly fechaCreacion: Date;
}

export class AutenticarAlumno {
  readonly correoElectronico: string;
  readonly claveAcceso: string;
}
