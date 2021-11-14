import {Entity, model, property, belongsTo, hasOne, hasMany} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Afiliacion} from './afiliacion.model';
import {Empleado} from './empleado.model';
import {ConsultaVet} from './consulta-vet.model';
import {PagoPlan} from './pago-plan.model';

@model()
export class Mascota extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  mascotaId?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  especie: string;

  @property({
    type: 'string',
    required: true,
  })
  raza: string;

  @property({
    type: 'string',
    required: true,
  })
  sexo: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaNacimiento: string;

  @property({
    type: 'string',
    required: true,
  })
  alimento: string;

  @property({
    type: 'string',
    required: true,
  })
  enfermedades: string;

  @property({
    type: 'string',
    required: true,
  })
  foto: string;

  @belongsTo(() => Cliente)
  clienteId: string;

  @hasOne(() => Afiliacion)
  afiliacion: Afiliacion;

  @belongsTo(() => Empleado)
  empleadoId: string;

  @hasMany(() => ConsultaVet)
  consultaVets: ConsultaVet[];

  @hasMany(() => PagoPlan)
  pagoPlans: PagoPlan[];

  constructor(data?: Partial<Mascota>) {
    super(data);
  }
}

export interface MascotaRelations {
  // describe navigational properties here
}

export type MascotaWithRelations = Mascota & MascotaRelations;
