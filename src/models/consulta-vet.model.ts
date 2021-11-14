import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Proveedor} from './proveedor.model';
import {Mascota} from './mascota.model';

@model()
export class ConsultaVet extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  consultaId?: string;

  @belongsTo(() => Proveedor)
  proveedorId: string;

  @belongsTo(() => Mascota)
  mascotaId: string;

  constructor(data?: Partial<ConsultaVet>) {
    super(data);
  }
}

export interface ConsultaVetRelations {
  // describe navigational properties here
}

export type ConsultaVetWithRelations = ConsultaVet & ConsultaVetRelations;
