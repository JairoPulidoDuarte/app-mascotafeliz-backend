import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {ConsultaVet, ConsultaVetRelations, Proveedor, Mascota} from '../models';
import {ProveedorRepository} from './proveedor.repository';
import {MascotaRepository} from './mascota.repository';

export class ConsultaVetRepository extends DefaultCrudRepository<
  ConsultaVet,
  typeof ConsultaVet.prototype.consultaId,
  ConsultaVetRelations
> {

  public readonly proveedor: BelongsToAccessor<Proveedor, typeof ConsultaVet.prototype.consultaId>;

  public readonly mascota: BelongsToAccessor<Mascota, typeof ConsultaVet.prototype.consultaId>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ProveedorRepository') protected proveedorRepositoryGetter: Getter<ProveedorRepository>, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>,
  ) {
    super(ConsultaVet, dataSource);
    this.mascota = this.createBelongsToAccessorFor('mascota', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascota', this.mascota.inclusionResolver);
    this.proveedor = this.createBelongsToAccessorFor('proveedor', proveedorRepositoryGetter,);
    this.registerInclusionResolver('proveedor', this.proveedor.inclusionResolver);
  }
}
