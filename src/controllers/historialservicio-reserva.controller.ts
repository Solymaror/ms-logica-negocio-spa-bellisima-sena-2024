import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Historialservicio,
  Reserva,
} from '../models';
import {HistorialservicioRepository} from '../repositories';

export class HistorialservicioReservaController {
  constructor(
    @repository(HistorialservicioRepository)
    public historialservicioRepository: HistorialservicioRepository,
  ) { }

  @get('/historialservicios/{id}/reserva', {
    responses: {
      '200': {
        description: 'Reserva belonging to Historialservicio',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Reserva),
          },
        },
      },
    },
  })
  async getReserva(
    @param.path.number('id') id: typeof Historialservicio.prototype.id,
  ): Promise<Reserva> {
    return this.historialservicioRepository.reserva(id);
  }
}
