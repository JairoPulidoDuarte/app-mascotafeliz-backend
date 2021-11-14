import {Entity, model, property, hasMany} from '@loopback/repository';
import {Producto} from './producto.model';
import {ConsultaVet} from './consulta-vet.model';

@model()
export class Proveedor extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  proveedorId?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  nit: string;

  @property({
    type: 'string',
    required: true,
  })
  telefonoFijo: string;

  @property({
    type: 'string',
    required: true,
  })
  telefonoCelular: string;

  @property({
    type: 'string',
    required: true,
    
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  ciudad: string;

  @hasMany(() => Producto)
  productos: Producto[];

  @hasMany(() => ConsultaVet)
  consultaVets: ConsultaVet[];

  constructor(data?: Partial<Proveedor>) {
    super(data);
  }
}

export interface ProveedorRelations {
  // describe navigational properties here
}

export type ProveedorWithRelations = Proveedor & ProveedorRelations;
