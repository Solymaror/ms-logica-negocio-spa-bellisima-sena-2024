import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Historialservicio, HistorialservicioRelations, Reserva} from '../models';
import {ReservaRepository} from './reserva.repository';

export class HistorialservicioRepository extends DefaultCrudRepository<
  Historialservicio,
  typeof Historialservicio.prototype.id,
  HistorialservicioRelations
> {

  public readonly reserva: BelongsToAccessor<Reserva, typeof Historialservicio.prototype.id>;

  constructor(
    @inject('datasources.Mysql') dataSource: MysqlDataSource, @repository.getter('ReservaRepository') protected reservaRepositoryGetter: Getter<ReservaRepository>,
  ) {
    super(Historialservicio, dataSource);
    this.reserva = this.createBelongsToAccessorFor('reserva', reservaRepositoryGetter,);
    this.registerInclusionResolver('reserva', this.reserva.inclusionResolver);
  }
}
