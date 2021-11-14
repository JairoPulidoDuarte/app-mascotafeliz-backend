import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Pedido} from './pedido.model';
import {Producto} from './producto.model';

@model()
export class PedidoProducto extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  pedido_productoId?: string;

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

  @belongsTo(() => Pedido)
  pedidoId: string;

  @belongsTo(() => Producto)
  productoId: string;

  constructor(data?: Partial<PedidoProducto>) {
    super(data);
  }
}

export interface PedidoProductoRelations {
  // describe navigational properties here
}

export type PedidoProductoWithRelations = PedidoProducto & PedidoProductoRelations;
