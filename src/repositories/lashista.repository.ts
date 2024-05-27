import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Lashista, LashistaRelations, Reserva} from '../models';
import {ReservaRepository} from './reserva.repository';

export class LashistaRepository extends DefaultCrudRepository<
  Lashista,
  typeof Lashista.prototype.id,
  LashistaRelations
> {

  public readonly reservas: HasManyRepositoryFactory<Reserva, typeof Lashista.prototype.id>;

  public readonly reserva: BelongsToAccessor<Reserva, typeof Lashista.prototype.id>;

  public readonly reservlasid: BelongsToAccessor<Reserva, typeof Lashista.prototype.id>;

  constructor(
    @inject('datasources.Mysql') dataSource: MysqlDataSource, @repository.getter('ReservaRepository') protected reservaRepositoryGetter: Getter<ReservaRepository>,
  ) {
    super(Lashista, dataSource);
    this.reservlasid = this.createBelongsToAccessorFor('reservlasid', reservaRepositoryGetter,);
    this.registerInclusionResolver('reservlasid', this.reservlasid.inclusionResolver);
    this.reserva = this.createBelongsToAccessorFor('reserva', reservaRepositoryGetter,);
    this.registerInclusionResolver('reserva', this.reserva.inclusionResolver);
    this.reservas = this.createHasManyRepositoryFactoryFor('reservas', reservaRepositoryGetter,);
    this.registerInclusionResolver('reservas', this.reservas.inclusionResolver);
  }
}
