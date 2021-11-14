import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {PagoPlan, PagoPlanRelations, Mascota, Plan} from '../models';
import {MascotaRepository} from './mascota.repository';
import {PlanRepository} from './plan.repository';

export class PagoPlanRepository extends DefaultCrudRepository<
  PagoPlan,
  typeof PagoPlan.prototype.pago_planId,
  PagoPlanRelations
> {

  public readonly mascota: BelongsToAccessor<Mascota, typeof PagoPlan.prototype.pago_planId>;

  public readonly plan: BelongsToAccessor<Plan, typeof PagoPlan.prototype.pago_planId>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>,
  ) {
    super(PagoPlan, dataSource);
    this.plan = this.createBelongsToAccessorFor('plan', planRepositoryGetter,);
    this.registerInclusionResolver('plan', this.plan.inclusionResolver);
    this.mascota = this.createBelongsToAccessorFor('mascota', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascota', this.mascota.inclusionResolver);
  }
}
