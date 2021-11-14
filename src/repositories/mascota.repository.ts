import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Mascota, MascotaRelations, Cliente, Afiliacion, Empleado, ConsultaVet, PagoPlan} from '../models';
import {ClienteRepository} from './cliente.repository';
import {AfiliacionRepository} from './afiliacion.repository';
import {EmpleadoRepository} from './empleado.repository';
import {ConsultaVetRepository} from './consulta-vet.repository';
import {PagoPlanRepository} from './pago-plan.repository';

export class MascotaRepository extends DefaultCrudRepository<
  Mascota,
  typeof Mascota.prototype.mascotaId,
  MascotaRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Mascota.prototype.mascotaId>;

  public readonly afiliacion: HasOneRepositoryFactory<Afiliacion, typeof Mascota.prototype.mascotaId>;

  public readonly empleado: BelongsToAccessor<Empleado, typeof Mascota.prototype.mascotaId>;

  public readonly consultaVets: HasManyRepositoryFactory<ConsultaVet, typeof Mascota.prototype.mascotaId>;

  public readonly pagoPlans: HasManyRepositoryFactory<PagoPlan, typeof Mascota.prototype.mascotaId>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('AfiliacionRepository') protected afiliacionRepositoryGetter: Getter<AfiliacionRepository>, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>, @repository.getter('ConsultaVetRepository') protected consultaVetRepositoryGetter: Getter<ConsultaVetRepository>, @repository.getter('PagoPlanRepository') protected pagoPlanRepositoryGetter: Getter<PagoPlanRepository>,
  ) {
    super(Mascota, dataSource);
    this.pagoPlans = this.createHasManyRepositoryFactoryFor('pagoPlans', pagoPlanRepositoryGetter,);
    this.registerInclusionResolver('pagoPlans', this.pagoPlans.inclusionResolver);
    this.consultaVets = this.createHasManyRepositoryFactoryFor('consultaVets', consultaVetRepositoryGetter,);
    this.registerInclusionResolver('consultaVets', this.consultaVets.inclusionResolver);
    this.empleado = this.createBelongsToAccessorFor('empleado', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleado', this.empleado.inclusionResolver);
    this.afiliacion = this.createHasOneRepositoryFactoryFor('afiliacion', afiliacionRepositoryGetter);
    this.registerInclusionResolver('afiliacion', this.afiliacion.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
