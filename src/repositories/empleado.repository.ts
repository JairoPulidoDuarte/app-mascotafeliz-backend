import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Empleado, EmpleadoRelations, Afiliacion, Mascota} from '../models';
import {AfiliacionRepository} from './afiliacion.repository';
import {MascotaRepository} from './mascota.repository';
//import {EmpleadoRepository} from './empleado.repository';

export class EmpleadoRepository extends DefaultCrudRepository<
  Empleado,
  typeof Empleado.prototype.empleadoId,
  EmpleadoRelations
> {

  public readonly afiliacions: HasManyRepositoryFactory<Afiliacion, typeof Empleado.prototype.empleadoId>;

  public readonly mascotas: HasManyRepositoryFactory<Mascota, typeof Empleado.prototype.empleadoId>;

  public readonly empleados: HasManyRepositoryFactory<Empleado, typeof Empleado.prototype.empleadoId>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AfiliacionRepository') protected afiliacionRepositoryGetter: Getter<AfiliacionRepository>, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>,
  ) {
    super(Empleado, dataSource);
    this.empleados = this.createHasManyRepositoryFactoryFor('empleados', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleados', this.empleados.inclusionResolver);
    this.mascotas = this.createHasManyRepositoryFactoryFor('mascotas', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascotas', this.mascotas.inclusionResolver);
    this.afiliacions = this.createHasManyRepositoryFactoryFor('afiliacions', afiliacionRepositoryGetter,);
    this.registerInclusionResolver('afiliacions', this.afiliacions.inclusionResolver);
  }
}
