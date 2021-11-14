import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Mascota} from './mascota.model';
import {Plan} from './plan.model';

@model()
export class PagoPlan extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  pago_planId?: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaPlan: string;

  @property({
    type: 'string',
    required: true,
  })
  formaPago: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @property({
    type: 'number',
    required: true,
  })
  totalPago: number;

  @belongsTo(() => Mascota)
  mascotaId: string;

  @belongsTo(() => Plan)
  planId: string;

  constructor(data?: Partial<PagoPlan>) {
    super(data);
  }
}

export interface PagoPlanRelations {
  // describe navigational properties here
}

export type PagoPlanWithRelations = PagoPlan & PagoPlanRelations;
