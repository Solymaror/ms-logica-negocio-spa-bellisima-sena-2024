import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Reserva, ReservaRelations, Cliente, Servicio, Recepcionista} from '../models';
import {ClienteRepository} from './cliente.repository';
import {ServicioRepository} from './servicio.repository';
import {RecepcionistaRepository} from './recepcionista.repository';

export class ReservaRepository extends DefaultCrudRepository<
  Reserva,
  typeof Reserva.prototype.id,
  ReservaRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Reserva.prototype.id>;

  public readonly servicios: BelongsToAccessor<Servicio, typeof Reserva.prototype.id>;

  public readonly reservarecepcionita: BelongsToAccessor<Recepcionista, typeof Reserva.prototype.id>;

  constructor(
    @inject('datasources.Mysql') dataSource: MysqlDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('ServicioRepository') protected servicioRepositoryGetter: Getter<ServicioRepository>, @repository.getter('RecepcionistaRepository') protected recepcionistaRepositoryGetter: Getter<RecepcionistaRepository>,
  ) {
    super(Reserva, dataSource);
    this.reservarecepcionita = this.createBelongsToAccessorFor('reservarecepcionita', recepcionistaRepositoryGetter,);
    this.registerInclusionResolver('reservarecepcionita', this.reservarecepcionita.inclusionResolver);
    this.servicios = this.createBelongsToAccessorFor('servicios', servicioRepositoryGetter,);
    this.registerInclusionResolver('servicios', this.servicios.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
