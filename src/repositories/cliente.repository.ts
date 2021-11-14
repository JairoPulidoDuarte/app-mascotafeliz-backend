import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Cliente, ClienteRelations, Afiliacion, Mascota, Pedido} from '../models';
import {AfiliacionRepository} from './afiliacion.repository';
import {MascotaRepository} from './mascota.repository';
import {PedidoRepository} from './pedido.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.clienteId,
  ClienteRelations
> {

  public readonly afiliacions: HasManyRepositoryFactory<Afiliacion, typeof Cliente.prototype.clienteId>;

  public readonly mascotas: HasManyRepositoryFactory<Mascota, typeof Cliente.prototype.clienteId>;

  public readonly pedidos: HasManyRepositoryFactory<Pedido, typeof Cliente.prototype.clienteId>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AfiliacionRepository') protected afiliacionRepositoryGetter: Getter<AfiliacionRepository>, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>, @repository.getter('PedidoRepository') protected pedidoRepositoryGetter: Getter<PedidoRepository>,
  ) {
    super(Cliente, dataSource);
    this.pedidos = this.createHasManyRepositoryFactoryFor('pedidos', pedidoRepositoryGetter,);
    this.registerInclusionResolver('pedidos', this.pedidos.inclusionResolver);
    this.mascotas = this.createHasManyRepositoryFactoryFor('mascotas', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascotas', this.mascotas.inclusionResolver);
    this.afiliacions = this.createHasManyRepositoryFactoryFor('afiliacions', afiliacionRepositoryGetter,);
    this.registerInclusionResolver('afiliacions', this.afiliacions.inclusionResolver);
  }
}
