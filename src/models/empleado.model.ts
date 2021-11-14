import {Entity, hasMany, model, property} from '@loopback/repository';
import {Afiliacion} from './afiliacion.model';
//import {Empleado} from './empleado.model';
import {Mascota} from './mascota.model';

@model()
export class Empleado extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  empleadoId?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  genero: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  nivel: string;

  @property({
    type: 'string',
    required: true,
  })
  usuario: string;

  @property({
    type: 'string',
    required: true,
  })
  clave: string;

  @hasMany(() => Afiliacion)
  afiliacions: Afiliacion[];

  @hasMany(() => Mascota)
  mascotas: Mascota[];

  @hasMany(() => Empleado)
  empleados: Empleado[];

  constructor(data?: Partial<Empleado>) {
    super(data);
  }
}

export interface EmpleadoRelations {
  // describe navigational properties here
}

export type EmpleadoWithRelations = Empleado & EmpleadoRelations;
