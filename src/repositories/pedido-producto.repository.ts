import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {PedidoProducto, PedidoProductoRelations, Pedido, Producto} from '../models';
import {PedidoRepository} from './pedido.repository';
import {ProductoRepository} from './producto.repository';

export class PedidoProductoRepository extends DefaultCrudRepository<
  PedidoProducto,
  typeof PedidoProducto.prototype.pedido_productoId,
  PedidoProductoRelations
> {

  public readonly pedido: BelongsToAccessor<Pedido, typeof PedidoProducto.prototype.pedido_productoId>;

  public readonly producto: BelongsToAccessor<Producto, typeof PedidoProducto.prototype.pedido_productoId>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PedidoRepository') protected pedidoRepositoryGetter: Getter<PedidoRepository>, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>,
  ) {
    super(PedidoProducto, dataSource);
    this.producto = this.createBelongsToAccessorFor('producto', productoRepositoryGetter,);
    this.registerInclusionResolver('producto', this.producto.inclusionResolver);
    this.pedido = this.createBelongsToAccessorFor('pedido', pedidoRepositoryGetter,);
    this.registerInclusionResolver('pedido', this.pedido.inclusionResolver);
  }
}
