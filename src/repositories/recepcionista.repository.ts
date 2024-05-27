import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Recepcionista, RecepcionistaRelations, Servicio} from '../models';
import {ServicioRepository} from './servicio.repository';

export class RecepcionistaRepository extends DefaultCrudRepository<
  Recepcionista,
  typeof Recepcionista.prototype.id,
  RecepcionistaRelations
> {

  public readonly servicios: HasManyRepositoryFactory<Servicio, typeof Recepcionista.prototype.id>;

  constructor(
    @inject('datasources.Mysql') dataSource: MysqlDataSource, @repository.getter('ServicioRepository') protected servicioRepositoryGetter: Getter<ServicioRepository>,
  ) {
    super(Recepcionista, dataSource);
    this.servicios = this.createHasManyRepositoryFactoryFor('servicios', servicioRepositoryGetter,);
    this.registerInclusionResolver('servicios', this.servicios.inclusionResolver);
  }
}
